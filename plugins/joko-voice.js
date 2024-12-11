var axios = require('axios');

var handler = async (m, { text, command }) => {
    if (!text) throw `Masukkan pertanyaan!\n\n*Contoh:* .joko nama kamu siapa?`;

    try {
        await m.reply("Tunggu sebentar...");
        // Mengambil respon dari API Joko
        var aiResponse = await axios.get(`https://api.siputzx.my.id/api/ai/joko?content=${encodeURIComponent(text)}`);
        var ttsUrl = `https://api.siputzx.my.id/api/tools/tts?voice=jv-ID-DimasNeural&rate=0&pitch=0&volume=0&text=${encodeURIComponent(aiResponse.data.data)}`;

        // Mengirimkan audio hasil TTS
        await conn.sendMessage(m.chat, { 
            mimetype: 'audio/mp4', 
            audio: { url: ttsUrl } 
        }, { quoted: m });
    } catch (err) {
        console.error(err);
        throw "Terjadi kesalahan saat memproses permintaan Joko.";
    }
};

handler.command = handler.help = ['joko'];
handler.tags = ['tools'];
handler.premium = false;
handler.limit = true;

module.exports = handler;