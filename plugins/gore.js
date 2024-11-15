let handler = async (m, { conn, args, usedPrefix, text, command }) => {
  
  let c = text.split('//');
  let cd = c[1];
  let cdn = 'cdn.' + cd;
  let Jx = c[0]
  let Jan = text.split('=');
  let Jann = Jan[1];
  let JannX = Jann + '.mp4';
  let link = Jx + '//cdn.videy.co/' + JannX
  let title = `Tools by JxPLOIT`;
  let fail = `*! URL Tidak didukung !*\n\nHanya dapat scrapping media dari *\`videy.co\`*`;
  
  if (!args[0]) {
    throw `!URL REQUIRE!\n\nEx:\n${usedPrefix + command} https://videy.co/v?id=7q1HQKNO`
  } else if (args[0].startsWith(Jx) && !text.includes('videy.co')) {
        m.reply(fail)
  } else if (args[0].startsWith(Jx) && text.includes('videy.co')) {
        m.reply('*URL INVALID*')
  }
  
  try {
    m.reply(wait);
    await conn.sendMessage(m.chat, {
    caption: wm,
    video: { url: link},
       contextInfo: {
       mentionedJid: [m.sender],
       externalAdReply: {  
               title: title,
               body: global.wm,
               thumbnailUrl: '',
               sourceUrl: args[0],
               mediaType: 1,
               renderLargerThumbnail: true 
               }}}, { quoted: m})
   } catch (e) {
    conn.reply(m.chat, `\`\`\`${e}\`\`\``, m)
  }
}

handler.help = ['videy <url>']
handler.tags = ['downloader']
handler.command = /^videy(co|dl)?$/i 
module.exports = handler