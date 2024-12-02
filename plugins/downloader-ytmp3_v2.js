const axios = require('axios');

const SaveTube = {
    qualities: {
        audio: { 1: '32', 2: '64', 3: '128', 4: '192' },
        video: { 1: '144', 2: '240', 3: '360', 4: '480', 5: '720', 6: '1080', 7: '1440', 8: '2160' }
    },

    headers: {
        'accept': '*/*',
        'referer': 'https://ytshorts.savetube.me/',
        'origin': 'https://ytshorts.savetube.me/',
        'user-agent': 'Postify/1.0.0',
        'Content-Type': 'application/json'
    },

    cdn() {
        return Math.floor(Math.random() * 11) + 51;
    },

    checkQuality(type, qualityIndex) {
        if (!(qualityIndex in this.qualities[type])) {
            throw new Error(`❌ Kualitas ${type} tidak valid. Pilih salah satu: ${Object.keys(this.qualities[type]).join(', ')}`);
        }
    },

    async fetchData(url, cdn, body = {}) {
        const headers = {
            ...this.headers,
            'authority': `cdn${cdn}.savetube.su`
        };

        try {
            const response = await axios.post(url, body, { headers });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    dLink(cdnUrl, type, quality, videoKey) {
        return `https://${cdnUrl}/download`;
    },

    async dl(link, qualityIndex, typeIndex) {
        const type = typeIndex === 1 ? 'audio' : 'video';
        const quality = SaveTube.qualities[type][qualityIndex];
        if (!type) throw new Error('❌ Tipe tidak valid. Pilih 1 untuk audio atau 2 untuk video.');
        SaveTube.checkQuality(type, qualityIndex);
        const cdnNumber = SaveTube.cdn();
        const cdnUrl = `cdn${cdnNumber}.savetube.su`;

        const videoInfo = await SaveTube.fetchData(`https://${cdnUrl}/info`, cdnNumber, { url: link });
        const body = {
            downloadType: type,
            quality: quality,
            key: videoInfo.data.key
        };

        const dlRes = await SaveTube.fetchData(SaveTube.dLink(cdnUrl, type, quality, videoInfo.data.key), cdnNumber, body);

        return {
            link: dlRes.data.downloadUrl,
            duration: videoInfo.data.duration,
            durationLabel: videoInfo.data.durationLabel,
            fromCache: videoInfo.data.fromCache,
            id: videoInfo.data.id,
            key: videoInfo.data.key,
            thumbnail: videoInfo.data.thumbnail,
            thumbnail_formats: videoInfo.data.thumbnail_formats,
            title: videoInfo.data.title,
            titleSlug: videoInfo.data.titleSlug,
            videoUrl: videoInfo.data.url,
            quality,
            type
        };
    }
};

const handler = async (m, { conn, args, text, sendSticker, otw }) => {
    if (!text) throw `Example .ytmp3 linkvid -kualitas audio\naudio: 1: '32', 2: '64', 3: '128', 4: '192'`;
    try {
        sendSticker(otw);

        const [url, qualityArg] = args.join(" ").split(" -");
        const qualityIndex = parseInt(qualityArg, 10);
        if (!url || isNaN(qualityIndex)) {
            throw `❌ Format salah! Gunakan format: .ytmp3 <link> -<kualitas>\nContoh: .ytmp3 https://youtu.be/example -3`;
        }

        const result = await SaveTube.dl(url, qualityIndex, 1);
        const { link, title, durationLabel, quality, thumbnail } = result;

        let caption = `*乂 Y T M P 3 - P L A Y*\n\n` +
                      `   ◦ Quality : ${quality} kbps\n` +
                      `   ◦ Title : ${title}\n` +
                      `   ◦ Duration : ${durationLabel}\n` +
                      `   ◦ Link : ${link}\n`;

        await conn.sendMessage(
            m.chat,
            {
                text: caption,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: "[ AETHER INFORMATION ]",
                        newsletterName: "120363354653620526@newsletter",
                    },
                    externalAdReply: {
                        title: title,
                        thumbnailUrl: thumbnail,
                        sourceUrl: link,
                        mediaType: 1,
                        renderLargerThumbnail: true,
                    },
                },
            },
            { quoted: m }
        );

        await conn.sendMessage(
            m.chat,
            {
                audio: { url: link },
                mimetype: 'audio/mpeg',
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: "[ AETHER INFORMATION ]",
                        newsletterName: "120363354653620526@newsletter",
                    },
                    externalAdReply: {
                        title: `Audio File - ${title}`,
                        body: 'Download Success!',
                        thumbnailUrl: thumbnail,
                        renderLargerThumbnail: false,
                        mediaType: 1,
                        sourceUrl: link,
                    },
                },
            },
            { quoted: m }
        );
    } catch (err) {
        console.error(err);
        m.reply("❌ Terjadi kesalahan saat memproses permintaan Anda.");
    }
};

handler.tags = ["downloader"];
handler.command = ["ytmp3-v2", "yta-v2"];
handler.help = ["ytmp3-v2", "yta-v2"];
handler.limit = true
handler.register = true
module.exports = handler;