let handler = async (m, { text }) => {
    const axios = require('axios');

    try {
        if (!text) {
            throw 'Harap masukkan path file di GitHub!\nContoh: .getgh aetherzcode/BOT-WA-AETHER/plugins/menu.js';
        }

        // Pisahkan input menjadi owner/repo/path
        const match = text.match(/^([\w-]+)\/([\w-]+)\/(.+)$/);
        if (!match) {
            throw 'Format salah! Gunakan format: owner/repo/path/file.js';
        }

        const owner = match[1]; // Username GitHub
        const repo = match[2]; // Repository
        const filePath = match[3]; // Path file
        const branch = 'main'; // Default branch

        // URL file di GitHub
        const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath}`;
        console.log('Mengambil file dari:', url);

        // Ambil konten file
        const response = await axios.get(url);

        // Kirim konten file ke pengguna
        m.reply(`Berhasil mengambil file dari GitHub!\nPath: ${filePath}\n\nKonten:\n\n${response.data}`);
    } catch (e) {
        if (e.response && e.response.status === 404) {
            m.reply('File tidak ditemukan di GitHub!');
        } else {
            m.reply(`Terjadi kesalahan: ${e.message}`);
        }
        console.error(e.response ? e.response.data : e.message);
    }
};

handler.help = ['getgithub'];
handler.tags = ['tools'];
handler.command = /^(getgh|getgithub)$/i;

module.exports = handler;