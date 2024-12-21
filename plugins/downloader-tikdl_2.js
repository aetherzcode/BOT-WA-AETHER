let axios = require('axios')

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  if (!text) {
    conn.sendPresenceUpdate("composing", m.chat)
    return conn.reply(m.chat, `• *Example :* .tiktok https://vm.tiktok.com/xxxxx`, m)
  }
  if (!text.match(/tiktok/gi)) {
    return conn.reply(m.chat, 'Make sure the link is from TikTok', m)
  }
  conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }
  });
  try {
    let old = new Date();
    let p = await tiktok2(`${text}`);
    let tag = await conn.sendFile(m.chat, p.no_watermark, 'tiktok.mp4', p.title, m);
    return conn.sendMessage(m.chat, {
    audio: {
    url: `${p.music}`
    },
    mimetype: 'audio/mp4', 
    fileName: `${p.title}.mp3`
    },{ quoted: tag})
    conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
   } catch (e) {
    console.log(e);
    conn.sendMessage(m.chat, {
      react: {
        text: '🤘',
        key: m.key,
      }
    });
  }

};

handler.help = ['tiktok'].map(v => v + ' *<url>*')
handler.tags = ['downloader'];
handler.command = /^(tiktok2|tt2|tiktokdl2|tiktoknowm2)$/i;
handler.limit = true;
handler.group = false;
handler.regiser = true;

module.exports = handler;

async function tiktok2(query) {
  return new Promise(async (resolve, reject) => {
    try {
    const encodedParams = new URLSearchParams();
encodedParams.set('url', query);
encodedParams.set('hd', '1');

      const response = await axios({
        method: 'POST',
        url: 'https://tikwm.com/api/',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Cookie': 'current_language=en',
          'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36'
        },
        data: encodedParams
      });
      const videos = response.data.data;
        const result = {
          title: videos.title,
          cover: videos.cover,
          origin_cover: videos.origin_cover,
          no_watermark: videos.play,
          watermark: videos.wmplay,
          music: videos.music
        };
        resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}