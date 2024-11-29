let handler = async(m, { conn, text, usedPrefix, command }) => {
    const axios = require('axios');
    const fs = require('fs');

    const githubToken = '-'; // Token GitHub
    const owner = 'aetherzcode'; // Username GitHub
    const repo = 'BOT-WA-AETHER'; // Repository
    const branch = 'main'; // Branch tempat file di-upload

    const fileExists = async(owner, repo, filePath, branch) => {
        try {
            await axios.get(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`, {
                headers: {
                    Authorization: `Bearer ${githubToken}`,
                },
            });
            return true;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                return false;
            }
            throw error;
        }
    };

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
        // Periksa apakah ada media
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || '';

        if (!mime) {
            throw 'Media tidak ditemukan!';
        }

        // Ambil nama file dari input pengguna
        let customFileName = text.trim() || `${Date.now()}.${mime.split('/')[1]}`; // Gunakan nama file yang diberikan atau default

        // Tampilkan reaksi atau pesan proses
        if (typeof m.react === 'function') {
            m.react('⌛');
        } else {
            m.reply('⌛ Sedang memproses, harap tunggu...');
        }

        // Unduh media
        let media = await q.download();
        let filePath = `plugins/${customFileName}`; // Gunakan nama file yang diberikan
        let base64Content = Buffer.from(media).toString('base64');

        // Periksa apakah file sudah ada
        if (await fileExists(owner, repo, filePath, branch)) {
            const sha = await getFileSha(owner, repo, filePath, branch);
            await axios.put(
                `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
                    message: `Overwrite file ${customFileName}`,
                    content: base64Content,
                    branch: branch,
                    sha: sha,
                }, {
                    headers: {
                        Authorization: `Bearer ${githubToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            m.reply(`File berhasil diupdate di GitHub!\nPath: ${filePath}`);
        } else {
            // Upload file baru
            await axios.put(
                `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
                    message: `Upload file ${customFileName}`,
                    content: base64Content,
                    branch: branch,
                }, {
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

handler.help = ['uploadtogithub'];
handler.tags = ['owner', 'tools'];
handler.command = /^(upgh|uploadgithub)$/i;
handler.limit = true;
handler.rowner = true;

module.exports = handler;