const axios = require('axios');
const cheerio = require('cheerio');

const yt1s = {
  dl: async (link) => {
    try {
      const { data } = await axios.post(
        'https://yt1s.io/api/ajaxSearch',
        new URLSearchParams({ p: 'home', q: link, w: '', lang: 'en' }),
        {
          headers: {
            'User-Agent': 'Postify/1.0.0',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          },
        }
      );

      if (data.status !== 'ok') throw new Error('Tidak ada respons dari API.');

      const $ = cheerio.load(data.data);
      return $('a.abutton.is-success.is-fullwidth.btn-premium')
        .map((_, el) => ({
          title: $(el).attr('title'),
          url: $(el).attr('href'),
        }))
        .get();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `Gunakan perintah: ${usedPrefix}${command} <link>`;

  await global.loading(m, conn);

  try {
    const downloadLinks = await yt1s.dl(text);

    if (downloadLinks.length < 2) {
      throw new Error('Maaf, tidak ada link unduhan yang kedua ditemukan.');
    }

    const { url } = downloadLinks[1];
    await conn.sendMessage(m.chat, { video: { url }, caption: 'Ini videonya kak.' });
  } catch (error) {
    m.reply(`Terjadi kesalahan: ${error.message}`);
  } finally {
    await global.loading(m, conn, true);
  }
};

handler.help = ['ig2 <link>'];
handler.tags = ['downloader'];
handler.command = /^(igdl2|instagram2|ig2)$/i;

handler.limit = 10;
handler.register = true;
handler.disable = false;

module.exports = handler;