var fetch = require('node-fetch');

let handler = async (m, { conn, text }) => {
    conn.autosimi = conn.autosimi ? conn.autosimi : {};

    if (!text) throw `*• Example:* .autosimi *[on/off]*`;

    if (text === "on") {
        conn.autosimi[m.sender] = {
            pesan: []
        };
        m.reply("[ ✓ ] Success create session chat");
    } else if (text === "off") {
        delete conn.autosimi[m.sender];
        m.reply("[ ✓ ] Success delete session chat");
    }
};

handler.before = async (m, { conn }) => {
  conn.autosimi = conn.autosimi ? conn.autosimi : {};
  if (m.isBaileys && m.fromMe) return;
  if (!m.text) return;
  if (!conn.autosimi[m.sender]) return;

  if (
    m.text.startsWith(".") ||
    m.text.startsWith("#") ||
    m.text.startsWith("!") ||
    m.text.startsWith("/") ||
    m.text.startsWith("\\/")
  ) return;

  if (conn.autosimi[m.sender] && m.text) {
    let name = conn.getName(m.sender);
    try {
    let res = await fetch(`https://api.betabotz.eu.org/api/search/simisimi?query=${m.text}&apikey=${lann}`)
    let json = await res.json()
    let data = json.result
      // Send the chatCompletion response
      conn.sendMessage(m.chat, {
        text: "𝘼𝙚𝙩𝙝𝙚𝙧𝙯 𝘼𝙞" + "\n\n" + data,
        contextInfo: {
          externalAdReply: {
            title: "𝘼𝙚𝙩𝙝𝙚𝙧𝙯 𝘼𝙞",
            body:
              "𝙔𝙤𝙨𝙝𝙖𝙖𝙖!!!",
            thumbnailUrl: 'https://btch.pages.dev/file/7576594882b09cbf341e9.jpg',
            sourceUrl: "https://aetherz.xyz",
            mediaType: 1,
            renderLargerThumbnail: true,
          },
        },
      }, { quoted: m });
    } catch (e) {
      console.log(e);
      throw "error";
    }
  }
};

handler.command = ['autosimi'];
handler.tags = ["ai"];
handler.help = ['autosimi'].map(a => a + " *[on/off]*");

module.exports = handler