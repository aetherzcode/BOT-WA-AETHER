let fetch = require('node-fetch')

let handler = async (m, { conn, command }) => {
let audio = 'src/AETHERZBOTZ.mp3'
const img = await fetch(`https://cdn.discordapp.com/attachments/1287434775111405635/1312389470229762109/upload.png?ex=674c5170&is=674afff0&hm=925dda410cac0684b4325f9f9f9b2c2930ad13eae2fdbfb670d156e91b667d4a&`).then(res => res.buffer())
let text = `🎵 Lagu AetherzBotz 🎵

(Verse 1)
Di Media, AetherzBotz beraksi,
Banyak script terbuka, semangat tak terganti.
AETHER, sang pemilik,
Menyebarkan kode-kode tak terhenti.

(Chorus)
AetherzBotz, oh AetherzBotz,
AETHER adalah penciptanya.
Dari fitur media downloader, hingga banyak fitur-fitur mengagumkan, tak terbantahkan.

(Verse 2)
Windows, VPS, RDP, semua bisa,
Git, NodeJS, FFmpeg, ImageMagick, jangan lupa.
ApiKey wajib diisi, jangan lupa,
Express, ffmpeg, imagemagick, webp, semua terhubung.

(Chorus)
AetherzBotz, oh AetherzBotz,
AETHER adalah penciptanya.
Dari fitur media downloader, hingga banyak fitur-fitur mengagumkan, yang tak terbantahkan.

(Bridge)
Scraper langka, toanime, remini, dan tozombie,
Uploader dari BOTCAHX dan AEMT, tak terbantahkan.
Menggunakan CDN dan AEMT,
Betabotz-tools, itulah yang menjadikan fitur-fiturnya mengagumkan.

(Chorus)
AetherzBotz, oh AetherzBotz,
AETHER adalah penciptanya.
Dari fitur media downloader, hingga banyak fitur-fitur mengagumkan yang tak terbantahkan.

(Outro)
Terima kasih. AETHER, Erlan Nayla...`
await conn.sendFile(m.chat, img, null, text, m);
conn.sendMessage(m.chat, { audio: { url: audio }, mimetype: 'audio/mpeg' }, { quoted: m });

}

handler.customPrefix = /^(aetherzbotz)$/i 
handler.command = new RegExp
handler.tags = ['main']
module.exports = handler