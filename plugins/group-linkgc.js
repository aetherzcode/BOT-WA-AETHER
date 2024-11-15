const { generateWAMessageFromContent, proto, prepareWAMessageMedia } = require("@whiskeysockets/baileys");

const handler = async (m, { conn }) => {
  const code = await conn.groupInviteCode(m.chat);

  const media = await prepareWAMessageMedia({ image: { url: 'https://telegra.ph/file/32d2670baf76cf850f9ca.jpg' } }, { upload: conn.waUploadToServer });

  let msg = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
    viewOnceMessage: {
      message: {
        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          contextInfo: {
            mentionedJid: [m.sender],
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363298737050223@newsletter',
              newsletterName: 'Powered By AETHER',
              serverMessageId: -1
            },
            businessMessageForwardInfo: { businessOwnerJid: conn.decodeJid(conn.user.id) },
            externalAdReply: {
              title: 'AETHER',
              thumbnailUrl: 'https://telegra.ph/file/32d2670baf76cf850f9ca.jpg',
              sourceUrl: 'https://aetherz.xyz/',
              mediaType: 1,
              renderLargerThumbnail: true
            }
          },
          body: proto.Message.InteractiveMessage.Body.create({
            text: ``
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: 'Click the button below to copy the group invite link'
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            title: `Hello, @${m.sender.replace(/@.+/g, '')}!`,
            subtitle: "AETHER",
            hasMediaAttachment: true,
            ...media
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [
              {
                name: "cta_copy",
                buttonParamsJson: `{"display_text":"Copy Link","id":"123456789","copy_code":"https://chat.whatsapp.com/${code}"}`
              }
            ]
          })
        })
      }
    }
  }), { userJid: m.chat, quoted: m });

  await conn.relayMessage(m.chat, msg.message, {
    messageId: msg.key.id
  });
}

handler.help = ['link'];
handler.tags = ['group'];
handler.command = /^link(g(c|ro?up))?$/i;
handler.group = true;
handler.botAdmin = true;

module.exports = handler;