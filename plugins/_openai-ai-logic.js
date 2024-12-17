var fetch = require('node-fetch');

var handler = async (m, {
 text, 
 usedPrefix, 
 command
 }) => {
if (!text) throw `Masukkan pertanyaan!\n\n*Contoh:* Siapa Kamu? `
//Set Logic Disini 
let logic = 'Hai Saya Adalah Aetherz Bot Whatsapp Yang Dikembangkan Oleh AETHER,Saya Bernama Aetherz, Saya Dibuat Oleh ARTHER Dengan Penuh Kesempurnaan Yang Tiada Taraa,Jika Kamu Ingin Mencari Tau Lebih Dalam Tentang Ownerku Visit https://aetherz.xyz'
await m.reply(wait)
  var js = await fetch(`https://api.betabotz.eu.org/api/search/openai-logic?text=${text}&logic=${logic}&apikey=${lann}`)
var json = await js.json()
try {
  await m.reply(json.message)
} catch (err ) {
m.reply(`${eror}`)
}}
handler.command = handler.help = ['ai2','openai2','chatgpt2'];
handler.tags = ['ai'];
handler.register = true
handler.premium = false
module.exports = handler;
