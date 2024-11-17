import {
    writeFile
} from 'fs/promises';
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

let handler = async (m, {
    conn,
    text
}) => {
    if (!m.quoted) return conn.reply(m.chat, 'Balas pesan audio dengan perintah ini', m);

    let mime = m.quoted.mimetype || '';
    let fileType;
    let fileName;

    const audioFormats = ['mp3', 'wav', 'flac', 'aiff', 'opus', 'ogg'];
    const qualityInfo = `
        - *MP3*: Kompresi lossy, kualitas standar hingga tinggi.
        - *WAV*: Tanpa kompresi, kualitas suara sangat tinggi.
        - *FLAC*: Kompresi lossless, kualitas suara sangat tinggi.
        - *AIFF*: Tanpa kompresi, kualitas suara sangat tinggi.
        - *Opus*: Kompresi tinggi, efisien untuk streaming.
        - *OGG*: Kompresi lossy, kualitas baik dengan ukuran file kecil.
    `;

    
    if (!text) {
        return conn.reply(m.chat, `Harap masukkan format yang tersedia: ${audioFormats.join(', ')}\n${qualityInfo}`, m);
    }

    const inputFormat = text.trim().toLowerCase();

    if (/audio/.test(mime)) {
        if (audioFormats.includes(inputFormat)) {
            fileType = inputFormat;
        } else {
            return conn.reply(m.chat, `Format tidak didukung. Pilih salah satu dari format berikut: ${audioFormats.join(', ')}\n${qualityInfo}`, m);
        }
    } else {
        return conn.reply(m.chat, 'Jenis file tidak didukung. Mohon balas ke pesan audio.', m);
    }

    try {
        let media = await m.quoted.download();
        if (!media) {
            return conn.reply(m.chat, 'Tidak dapat mendownload media', m);
        }

        fileName = path.join('/tmp', `temp.${fileType}`);
        await writeFile(fileName, media);

        const outputFileName = path.join('/tmp', `temp_converted.${fileType}`);
        ffmpeg(fileName)
            .output(outputFileName)
            .toFormat(fileType)
            .on('end', async () => {
                await conn.sendMessage(m.chat, {
                    document: {
                        url: outputFileName
                    },
                    mimetype: `audio/${fileType}`,
                    fileName: `audio.${fileType}`
                }, {
                    quoted: m
                });
            })
            .on('error', (err) => {
                console.error('Error processing file:', err);
                conn.reply(m.chat, `Terjadi kesalahan saat memproses file: ${err.message}`, m);
            })
            .run();

    } catch (e) {
        console.error('Error processing file:', e);
        conn.reply(m.chat, `Terjadi kesalahan saat memproses file: ${e.message}`, m);
    }
};

handler.help = ['convertaudio'];
handler.tags = ['tools'];
handler.command = /^(convertaudio)$/i;

module.exports = handler;
