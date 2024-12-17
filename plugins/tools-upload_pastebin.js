const axios = require('axios');
const PASTEBIN_API_KEY = 'n0FBhVt2SqwIhVjMuWosqxDHO8-oh5kC'; // API Key Dev Pastebin

const handler = async (m, { conn, text }) => {
  text = m.quoted && m.quoted.text ? m.quoted.text : text
  if (!text) throw 'Harap masukkan kode yang ingin diunggah ke Pastebin!';
  await conn.sendMessage(m.chat, { text: '🔄 Sedang mengunggah kode ke Pastebin...' }, { quoted: m });

  try {
    const data = {
      api_dev_key: PASTEBIN_API_KEY,
      api_option: 'paste',
      api_paste_code: text,
      api_paste_private: '1', // 1 = Unlisted, 0 = Public, 2 = Private
      api_paste_name: 'Kode dari Bot',
      api_paste_expire_date: 'N',
      api_paste_format: 'javascript'
    };

    const res = await axios.post('https://pastebin.com/api/api_post.php', new URLSearchParams(data));
    const pasteUrl = res.data;
    const message = `✅ Kode berhasil diunggah ke Pastebin dan tidak akan pernah kedaluwarsa!\n\n🌐 URL: ${pasteUrl}\n\nSilakan buka link di atas untuk melihat kode Anda.`;

    await conn.sendMessage(m.chat, { text: message }, { quoted: m });

  } catch (error) {
    console.error('Error saat mengunggah ke Pastebin:', error.message);
    await conn.sendMessage(m.chat, { text: `❗ Gagal mengunggah ke Pastebin: ${error.message}` }, { quoted: m });
  }
};
handler.help = ['uppastebin <kode>'];
handler.tags = ['owner', 'tools'];
handler.command = /^(uppastebin)$/i;
handler.owner = false;
handler.register = true;
module.exports = handler;
