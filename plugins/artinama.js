var handler = async (m, { text }) => {
  if (!text) return m.reply("[ ! ] Masukan nama kamu")
  let primb = require('scrape-primbon')

  var obj = new primb.Primbon();
  var result = await obj.arti_nama(text)
  let nama = await result.message.nama
  let artii = await result.message.arti
  let catatan = await result.message.catatan

  var arti = artii.replace(/\n/g, '')

  var ano = "*`A R T I  N A M A`*\n> ◉ Nama: " + nama + "\n> ◉ Arti: " + arti + "\n> ◉ Catatan: " + catatan + "\n\n" + info.wm
  
  m.reply(ano)
}
handler.help = ["artinama"].map(v => v + " " + "<query>")
handler.command = ["artinama"]
handler.tags = ["primbon"]
handler.register = true

module.exports = handler
