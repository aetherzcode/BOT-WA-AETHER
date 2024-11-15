let handler = async (m, { conn }) => {
    let jing = `@${m.sender.split`@`[0]}` // Mendapatkan nama kontak pengguna
    let caption = `
Hai kak ${jing}, \n*Therz File Manager* adalah situs penyimpanan file online yang gratis untuk semua pengguna. Simpan dan kelola file HTML, CSS, JavaScript, PHP, Foto, dan Video, Zip, Rar Anda di *Therz File Manager* sekarang!

Pendaftaran hanya memerlukan email yang masih aktif saja untuk verifikasi akun.

Link: https://file-manager.therz.xyz
`;

    // Mengirim gambar dengan caption
    await conn.sendMessage(m.chat, {
        image: { url: 'https://files.catbox.moe/g8crsm.jpg' }, // Ganti dengan URL gambar yang diinginkan
        caption: caption
    });
};

handler.help = ['fma', 'file-manager'];
handler.tags = ['info'];
handler.command = /^(fma|file-manager)$/i;

module.exports = handler;