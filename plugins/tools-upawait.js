const fetch = require('node-fetch');
const FormData = require('form-data');
let handler = async (m, {
    conn
}) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';
    if (!mime) throw 'Tidak ada media yang ditemukan untuk diupload!';
    const supportedMimeTypes = ['image/png', 'image/jpeg', 'image/webp', 'audio/mpeg', 'audio/mp4', 'audio/mp3'];
    if (!supportedMimeTypes.includes(mime)) throw 'Hanya mendukung gambar (PNG, JPG, WEBP) dan audio (MP3, MP4)!';
    let media = await q.download();
    if (!media) throw 'Gagal mengunduh media!';
    let extension = mime.split('/')[1];
    let formData = new FormData();
    formData.append('file', media, `file-${Date.now()}.${extension}`);
    try {
        const ndEndpoint = 'https://upload.anomaki.web.id/api/upload';
        let res = await fetch(ndEndpoint, {
            method: 'POST',
            body: formData,
        });
        if (!res.ok) throw `Gagal mengunggah media! Status: ${res.status}`;
        let json = await res.json();
        if (!json.url) throw 'Gagal mendapatkan URL dari server!';
        m.reply(`Media berhasil diunggah!\n\nLink: ${json.url}`);
    } catch (err) {
        console.error(err);
        m.reply(`Terjadi kesalahan saat mengunggah media: ${err.message}`);
    }
};
handler.help = ['upawait'];
handler.tags = ['tools'];
handler.command = /^(upawait)$/i;
handler.limit = true;
module.exports = handler;