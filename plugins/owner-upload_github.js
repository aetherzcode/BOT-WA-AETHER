let handler = async (m, { conn, text, usedPrefix, command }) => {
    const axios = require('axios');

    const owner = global.ownerrepo;
    const repo = global.repo;
    const githubToken = global.githubToken;
    const branch = 'main';

    const getFileSha = async (owner, repo, filePath, branch) => {
        try {
            const response = await axios.get(
                `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`, {
                    headers: {
                        Authorization: `Bearer ${githubToken}`,
                    },
                }
            );
            return response.data.sha;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                return null; // File tidak ditemukan
            }
            throw error; // Error lain
        }
    };

    try {
        // buat periksa ada reply pesan ngga
        if (!m.quoted || !m.quoted.text) {
            throw `Harap reply pesan yang berisi kode!\nContoh:\nReply pesan, lalu gunakan perintah: ${usedPrefix}${command} nama_file.js`;
        }

        // Ambil nama file dari input
        if (!text) throw `Harap masukkan nama file!\nContoh: ${usedPrefix}${command} plugins/nama_file.js`;

        const filePath = text.trim(); // Nama file yang akan diunggah
        const fileContent = m.quoted.text; // Konten file dari pesan yang direply

        console.log('Path file yang akan diupload atau diupdate:', filePath);
        console.log('Konten file:\n', fileContent);

        // Encode konten file ke base64
        const base64Content = Buffer.from(fileContent).toString('base64');

        // Periksa apakah file sudah ada
        const fileSha = await getFileSha(owner, repo, filePath, branch);

        if (fileSha) {
            // Update file jika sudah ada
            console.log('File ditemukan, akan diupdate...');
            await axios.put(
                `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
                {
                    message: `Update file ${filePath}`,
                    content: base64Content,
                    branch: branch,
                    sha: fileSha, // SHA file untuk update
                },
                {
                    headers: {
                        Authorization: `Bearer ${githubToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            m.reply(`File berhasil diupdate di GitHub!\nPath: ${filePath}`);
        } else {
            // Upload file baru jika belum ada
            console.log('File tidak ditemukan, akan diupload...');
            await axios.put(
                `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
                {
                    message: `Upload file ${filePath}`,
                    content: base64Content,
                    branch: branch,
                },
                {
                    headers: {
                        Authorization: `Bearer ${githubToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            m.reply(`File berhasil diupload ke GitHub!\nPath: ${filePath}`);
        }
    } catch (e) {
        m.reply(`Terjadi kesalahan: ${e.message}`);
        console.error(e.response ? e.response.data : e.message);
    }
};

handler.help = ['uploadupdategithub'];
handler.tags = ['owner', 'tools'];
handler.command = /^(upgh|upcodegh|uploadupdategithub)$/i;
handler.limit = true;
handler.rowner = true;

module.exports = handler;
