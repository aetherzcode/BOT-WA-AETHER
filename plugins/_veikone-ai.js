const fetch = require('node-fetch');

let handler = async (m, { conn, text, usedPrefix, command }) => {
 if(!text) throw `Masukkan query yang benar\nContoh ${usedPrefix}${command} selamat pagi`;
 try {
 let prompt = "Kamu adalah VeikoneAI, Kamu mempunyai sifat Tsundere"; //Ubah Sendiri Sesukamu
 let veiku = await fetch(`https://api.nyxs.pw/ai/character-ai?prompt=${text}&gaya=${prompt}`);
 let output = await veiku.json();
 await m.reply(output.result);
 } catch (e) {
  throw e;
 }
}

handler.command = ["vei"];
handler.tags = ["ai"];
handler.help = ["vei *<text>*"];
handler.limit = true;
handler.register = true;
module.exports = handler;
