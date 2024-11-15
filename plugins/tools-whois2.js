const fetch = require('node-fetch');
const handler = async (m, { text, usedPrefix, command }) => {
  if (!text) {
    throw `Masukkan Domain/Sub Domain!\n\n*Contoh:* botcahx.eu.org`;
  }
  if (text.includes('https://') || text.includes('http://')) {
    throw `Tolong masukkan domain/sub domain secara lengkap. Contoh: aetherscode.xyz`;
  }
  const options = {
    method: 'GET',
    headers: {
      'Authorization': 'Token=5c90915d176c6e6d274932f06697755ea2fca642dca8a519618f6805279cc896' //ganti apikey sendiri kalo abis :v
    }
  };
  try {
    const response = await fetch(`https://whoisjson.com/api/v1/whois?domain=${text}`, options);
    const data = await response.json();
    m.reply(JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
};
handler.command = ['whois2'];
handler.tags = ['internet'];
handler.premium = false;
module.exports = handler;