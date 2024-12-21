const axios = require('axios');
const deviceIDs = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
};
const typeMsg = {
  'anonymous': '',
  'confessions': 'confess',
  '3words': '3words',
  'neverhave': 'neverhave',
  'tbh': 'tbh',
  'shipme': 'shipme',
  'yourcrush': 'yourcrush',
  'cancelled': 'cancelled',
  'dealbreaker': 'dealbreaker'
};

const ngl = {
  send: async (link, message, type = "anonymous") => {
    const username = link.split('/').pop();
    let referrer, gameSlug;
    if (type === 'anonymous') {
      referrer = `https://ngl.link/${username}`;
      gameSlug = '';
    } else if (type === 'confessions' || type === '3words') {
      referrer = `https://${type}.ngl.link/${username}`;
      gameSlug = type;
    } else {
      gameSlug = typeMsg[type] || '';
      referrer = `https://ngl.link/${username}/${gameSlug}`;
    }
    const deviceId = deviceIDs();
    const data = {
      username: username,
      question: message,
      deviceId: deviceId,
      gameSlug: gameSlug,
      referrer: referrer
    };
    const url = "https://ngl.link/api/submit";
    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Postify/1.0.0'
        }
      });
      if (response.status === 200) {
        console.log(`✅ Pesan (${type}) berhasil dikirim!`);
        return true;
      } else {
        console.error(`❌ Pesan (${type}) gagal dikirim: `, response.statusText);
        return false;
      }
    } catch (error) {
      console.error(`❌ Error:`, error.message);
      return false;
    }
  }
};

const handler = async (m, { text, args, command, conn }) => {
  if (args.length < 2) {
    return m.reply(`Gunakan format yang benar: ${command} link pesan tipe`);
  }  
  const link = args[0];
  const message = args.slice(1).join(' ');
  const type = args[2] || 'anonymous';
  if (!Object.keys(typeMsg).includes(type) && type !== 'anonymous') {
    return m.reply('Tipe pesan tidak valid. Pilih tipe yang tersedia: anonymous, confessions, 3words, neverhave, tbh, shipme, yourcrush, cancelled, dealbreaker');
  }

  const success = await ngl.send(link, message, type);
  if (success) {
    m.reply(`✅ Pesan berhasil dikirim ke ${link} dengan tipe ${type}.`);
  } else {
    m.reply('❌ Gagal mengirim pesan.');
  }
};
handler.command = ['sendngl'];
handler.tags = ['internet'];
handler.help = ['sendngl link pesan type'];
module.exports = handler;