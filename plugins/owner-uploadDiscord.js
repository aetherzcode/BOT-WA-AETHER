const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

let handler = async(m, { conn, text, usedPrefix, command }) => {

    let nama = await conn.getName(m.sender);
    let numbers = m.quoted.sender;
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';
    if (!mime) throw `Harap reply pesan yang berisi file (gambar atau video)!`;

    const webhookUrl = 'https://discord.com/api/webhooks/1304403709312106596/95snqTgH2Bk-gHJNywb9ZfBqgIAC6l-THzA3IVZ3VxSRYE_SZ8x9weh8IdDtf50WwnO0';
    const channelId = '1287434775111405635';

    let media = await q.download();
    if (!media) throw `Gagal mengunduh media!`;

    const form = new FormData();
    form.append('file', media, {
        filename: 'upload.' + mime.split('/')[1],
        contentType: mime,
    });

    // Menghitung dan memformat ukuran file
    const fileSize = media.byteLength;
    const fileSizeFormatted = formatBytes(fileSize);

    // Menambahkan caption dengan ukuran file yang diformat
    const caption = `Ukuran File: ${fileSizeFormatted}\nFile By: AETHER\nSender: ${numbers}`;
    form.append('payload_json', JSON.stringify({ content: caption }));

    try {
        const response = await axios.post(webhookUrl, form, {
            headers: {
                ...form.getHeaders()
            }
        });

        await new Promise(resolve => setTimeout(resolve, 5000));

        const fileUrl = response.data.attachments[0].url;
        const message = `*📂  | Url File:* ${fileUrl}\n*🗄️ | Ukuran File:*  ${fileSizeFormatted}\n📛 | Kadaluarsa: Tidak ada kadaluarsa`

        conn.reply(m.chat, message, null);
    } catch (error) {
        throw `Gagal meng-upload file ke Discord!`;
    }
};

handler.help = ['uploaddc'];
handler.tags = ['owner', 'tools'];
handler.command = /^(updc|uploaddiscord)$/i;
handler.rowner = true;

module.exports = handler;