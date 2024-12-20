let handler = async(m, { conn, text, usedPrefix, command }) => {
    const axios = require('axios');

    const owner = global.ownerrepo;
    const repo = global.repo;
    const githubToken = global.githubToken;
    const branch = 'main'; // Branch tempat file dihapus

    const getFileSha = async(owner, repo, filePath, branch) => {
        const response = await axios.get(
            `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`, {
                headers: {
                    Authorization: `Bearer ${githubToken}`,
                },
            }
        );
        return response.data.sha;
    };

    try {
        // Periksa apakah ada input nama file
        if (!text) throw `Harap masukkan nama file!\nContoh: ${usedPrefix}${command} plugins/nama_file.js`;

        const filePath = text.trim(); // Path file yang akan dihapus

        // Ambil SHA file
        const sha = await getFileSha(owner, repo, filePath, branch);

        // Hapus file dari GitHub
        await axios.delete(
            `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
                headers: {
                    Authorization: `Bearer ${githubToken}`,
                },
                data: {
                    message: `Delete file ${filePath}`,
                    sha: sha,
                    branch: branch,
                },
            }
        );

        m.reply(`File berhasil dihapus dari GitHub!\nPath: ${filePath}`);
    } catch (e) {
        if (e.response && e.response.status === 404) {
            m.reply(`File tidak ditemukan di GitHub!\nPath: ${text.trim()}`);
        } else {
            m.reply(`Terjadi kesalahan: ${e.message}`);
            console.error(e.response ? e.response.data : e.message);
        }
    }
};

handler.help = ['deletefromgithub'];
handler.tags = ['owner', 'tools'];
handler.command = /^(delgh|deletegithub)$/i;
handler.limit = true;
handler.rowner = true;

module.exports = handler;
