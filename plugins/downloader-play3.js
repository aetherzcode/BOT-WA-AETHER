const axios = require('axios');
const yts = require('yt-search');

let handler = async (m, { conn, command, text, prefix }) => {
  if (!text || text.trim() === "") 
    return conn.reply(m.chat, `🎵 *Masukkan judul atau link!* 🎶\nContoh:\n\n${prefix + command} sephia\n${prefix + command} https://youtube.com/watch?v=example`, m);
  
  
  conn.reply(m.chat, '⏳ *Mohon tunggu, sedang memproses permintaan audio...* 🎧', m);

  try {
    let videoUrl, title, thumbnail, duration, views;

    
    const ytRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w\-_]+/;
    if (ytRegex.test(text)) {
      videoUrl = text.trim();
      title = `🎶 ᴘᴏᴡᴇʀᴇᴅ ʙʏ ${botname}`;
      thumbnail = 'https://g.top4top.io/p_3273ia0x21.jpg';
      
      duration = 'Unknown';
      views = 'Unknown';
    } else {
      
      const search = await yts(text);
      if (!search || !search.videos.length) {
        return conn.reply(m.chat, '🚫 *Video tidak ditemukan. Coba kata kunci lain.*', m);
      }
      const video = search.videos[0];
      videoUrl = video.url;
      title = video.title;
      thumbnail = video.image;
      duration = video.timestamp || 'Unknown';  // Menambahkan durasi yang ditemukan
      views = video.views || 'Unknown';  // Menambahkan views yang ditemukan
    }

    
    const encodedUrl = encodeURIComponent(videoUrl);

    
    const res = await axios.get(`https://api.siputzx.my.id/api/d/ytmp3?url=${encodedUrl}`);
    const result = res.data;

    if (!result.status || !result.data || !result.data.dl) {
      return conn.reply(m.chat, '⚠️ *Gagal mendapatkan audio dari link tersebut. Pastikan URL benar.*', m);
    }

    const audioUrl = result.data.dl;

    
    await Promise.all([
      conn.sendMessage(m.chat, {
        text: `🎶 *Audio dari:* ${title}\n📅 *Durasi:* ${duration}\n👁️ *Views:* ${views}\n📥 *Sedang mengirim audio...*`,
        contextInfo: {
          externalAdReply: {
            title: title,
            body: '',
            thumbnailUrl: thumbnail,
            sourceUrl: videoUrl,
            mediaType: 1,
            showAdAttribution: true,
            renderLargerThumbnail: true,
          },
        },
      }, { quoted: m }),
      
      conn.sendMessage(m.chat, {
        audio: { url: audioUrl },
        mimetype: 'audio/mpeg',
        fileName: `${title}.mp3`,
      }, { quoted: m })
    ]);

    
    conn.sendMessage(m.chat, { react: { text: '🎶️', key: m.key } });
    
  } catch (e) {
    console.error("Error pada fitur play:", e);
    return conn.reply(m.chat, `❌ *Terjadi kesalahan:* ${e.message}`, m);
  }
};

handler.help = ['play3'].map(v => v + ' <query>');
handler.tags = ['downloader'];
handler.command = /^(play3|mp3-v3)$/i;

module.exports = handler;