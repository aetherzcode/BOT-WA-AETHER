const fetch = require("node-fetch");

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args.length) return conn.reply(m.chat, `Gunakan format: ${usedPrefix}${command} [deskripsi]`, m);
  
  let inputText = args.join(" ");
  try {
    await m.reply(wait);
    let ress = await AimusicLyrics(inputText);
    if (!ress) return await m.reply("Failed.");
    
    await m.reply(`*\`AI MUSIC\`*\n\n> Judul: ${inputText}\n- Lyrics:\n\`\`\`${ress}\`\`\``);
  } catch (e) {
    throw e;
  }
};

handler.help = ["aimusiclyrics"];
handler.tags = ["ai"];
handler.command = /^(aimusiclyrics)$/i;
handler.register = true;

module.exports = handler;

async function AimusicLyrics(prompt) {
  const url = "https://aimusic.one/api/v3/lyrics/generator";
  const headers = {
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
    Referer: "https://aimusic.one/ai-lyrics-generator"
  };
  
  const data = {
    description: prompt,
    style: "Auto",
    topic: "Auto",
    mood: "Auto",
    lan: "auto",
    isPublic: true
  };
  
  try {
    let response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data)
    });
    let result = await response.json();
    return result.lyrics;
  } catch (e) {
    throw e;
  }
}
