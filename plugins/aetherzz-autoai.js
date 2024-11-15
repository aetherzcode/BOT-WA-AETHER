const { G4F } = require("g4f");
let Airi = new G4F();

let handler = async (m, { conn, text }) => {
    conn.autoai = conn.autoai ? conn.autoai : {};

    if (!text) throw `*• Example:* .aetherz *[on/off]*`;

    if (text === "on") {
        conn.autoai[m.sender] = {
            pesan: []
        };
        m.reply("Halo sensei! aetherz siap membantu sensei");
    } else if (text === "off") {
        delete conn.autoai[m.sender];
        m.reply("Senang sudah membantu sensei");
    }
};

handler.before = async (m, { conn }) => {
    conn.autoai = conn.autoai ? conn.autoai : {};
    if (m.isBaileys && m.fromMe) return;
    if (!m.text) return;
    if (!conn.autoai[m.sender]) return;

    if (
        m.text.startsWith(".") ||
        m.text.startsWith("#") ||
        m.text.startsWith("!") ||
        m.text.startsWith("/") ||
        m.text.startsWith("\\/")
    ) return;

    if (conn.autoai[m.sender] && m.text) {
        let name = conn.getName(m.sender);
        const messages = [
            ...conn.autoai[m.sender].pesan,
            `p`,
            m.text
        ];
        try {
      const options = [
    {model: "gpt-4"}
  ];
  const messages = [
    { role: "system", content: "kamu adalah aetherz, Seorang murid dari sensei yang siap membantu sensei kapan pun! 🍄✨" },
    { role: "assistant", content: `Kamu adalah aetherz, murid dari sensei, jangan gunakan saya, aku, saya gunakan aetherz untuk memanggil dirimu, ekspresi kan sikap kamu mirip seroang murid dari sensei yang diprivasi yang bernama aetherz, jangan gunakan GPT 4 panggil dirimu dengan aetherz, Kamu berbicara dengan${m.name}panggil dengan sensei, saat berbicara dengannya gunakan emoji yang lucu, Pembuatmu AETHER nomer WhatsApp nya ini 6285798045817 `},
    { role: "user", content: m.text },
  ];
  let res = await Airi.chatCompletion(messages, options);
  await  conn.sendMessage(m.chat, {
    text: "⬣───「 *AETHERZ* 」───⬣" + "\n\n" + res,
    contextInfo: {
      externalAdReply: {  
        title: "Aetherz - Ai",
        body: '',
        thumbnailUrl:`https://btch.pages.dev/file/7576594882b09cbf341e9.jpg`,
        sourceUrl: null,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });
                conn.autoai[m.sender].pesan = messages;
        } catch (e) {
            console.error("Kesalahan Dalam mengambil Data");
            throw "error";
        }
    }
};

handler.command = /^(aetherz)$/i
handler.help = ["aetherz"];
handler.tags = ["ai"];
handler.limit = true;
handler.owner = true;

module.exports = handler;