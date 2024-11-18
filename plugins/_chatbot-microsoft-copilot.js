const nomor = [{ name: "Microsoft Copilot", jid: "18772241042@s.whatsapp.net" }]

let handler = async (m, { conn, args }) => {
  let text
  if (args.length >= 1) {
    text = args.join(" ")
  } else if (m.quoted && m.quoted.text) {
    text = m.quoted.text
  } else throw "Input teks diperlukan."
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ""
  await m.reply(wait)
  let media = null
  if (/image\/(png|jpe?g)/.test(mime)) {
    media = await q.download()
  } else if (mime) {
    return await m.reply("Format gambar tidak didukung.")
  }
  if (media) {
    await conn.sendMessage(nomor[0].jid, { image: media, caption: text }, { quoted: m })
  } else {
    await conn.sendMessage(nomor[0].jid, { text: text }, { quoted: m })
  }
  let zenith = () => {
    return new Promise((resolve) => {
      conn.ev.on("messages.upsert", ({ messages }) => {
        let msg = messages[0]
        if (msg.key.remoteJid === nomor[0].jid && msg.message?.conversation) {
          resolve(msg.message.conversation)
        }
      })
    })
  }
  let ans = await zenith()
  await m.reply(ans)
}
handler.help = ["chatbot"]
handler.tags = ["ai"]
handler.command = ["chatbot"]
handler.private = false

module.exports = handler;
