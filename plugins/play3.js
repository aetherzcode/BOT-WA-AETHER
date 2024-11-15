const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = require("@adiwajshing/baileys") 
const yts = require('yt-search')
var handler = async (m, {
  conn,
  command,
  text,
  usedPrefix
}) => {
  if (!text) {
    throw `Contoh: ${usedPrefix + command} cupid`;
  }
  m.reply(wait);
  try {
    let results = await yts(text);
    let tes = results.all[0]
    let {
      title,
      thumbnail,
      timestamp,
      views,
      ago,
      url
    } = tes;
    let teks = "\n*" + title + "*" + "\n\n*Durasi:* " + timestamp + "\n*Views:* " + views + "\n*Upload:* " + ago + "\n*Link:* " + url + "\n";
    let msg = generateWAMessageFromContent(m.chat, {
      'viewOnceMessage': {
        'message': {
          'messageContextInfo': {
            'deviceListMetadata': {},
            'deviceListMetadataVersion': 0x2
          },
          'interactiveMessage': proto.Message.InteractiveMessage.create({
            'body': proto.Message.InteractiveMessage.Body.create({
              'text': teks
            }),
            'footer': proto.Message.InteractiveMessage.Footer.create({
              'text': wm
            }),
            'header': proto.Message.InteractiveMessage.Header.create({
              'hasMediaAttachment': false,
              ...(await prepareWAMessageMedia({
                'image': {
                  'url': thumbnail
                }
              }, {
                'upload': conn.waUploadToServer
              }))
            }),
            'nativeFlowMessage': proto.Message.InteractiveMessage.NativeFlowMessage.create({
              'buttons': [{
                'name': "quick_reply",
                'buttonParamsJson': "{\"display_text\":\"Audio\",\"id\":\".ytmp3 " + url + "\"}"
              }, {
                'name': "quick_reply",
                'buttonParamsJson': "{\"display_text\":\"Video\",\"id\":\".ytmp4 " + url + "\"}"
              }]
            })
          })
        }
      }
    }, {
      'quoted': m
    });
    return await conn.relayMessage(m.chat, msg.message, {});
  } catch (err) {
    conn.sendFile(m.chat, eror, "anu.mp3", null, m, true, {
      'type': "audioMessage",
      'ptt': true
    });
  }
};
handler.help = ["play3"];
handler.tags = ["downloader"];
handler.command = /^(play3)$/i;
handler.limit = true;
module.exports = handler