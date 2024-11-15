let handler = async (m, { conn }) => {
let tod = `@${m.sender.split`@`[0]}`
let tuto = `
Hai ${tod} ini adalah langkah-langkah tutorial untuk membuat akun di \n*Therz File-Manager* :\n\n1. Kunjungi situs file-manager.therz.xyz \n2. Klik tombol register dan isi form pendaftaran. \n3. Cek email kamu untuk verifikasi akun kamu, jika email tidak ditemukan silahkan cek folder Spam yang ada di garis tiga pojok kiri gmail nya. \4.Temukan email dari *THERZ FILE-MANAGER*\n5. Klik tulisan Verifikasi Akun yang berwarna biru. \n\nSetelah mengikuti langkah-langkah diatas dari saya selamat akun *Therz File-Manager* kamu sudah bisa digunakan😇
`
m.reply(tuto)
}
handler.help = ['tutor', 'tutorial']
handler.tags = ['info']
handler.command = /^(tutor|tutorial)$/i

module.exports = handler