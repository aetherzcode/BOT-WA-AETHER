import fetch from 'node-fetch'
import crypto from 'crypto'
import fs from 'fs'
const { proto, prepareWAMessageMedia, generateWAMessageFromContent } = (await import('@adiwajshing/baileys')).default
let handler = async (m, {conn ,text, args, command, usedPrefix, isOwner, isGroup, groupMetadata}) => {
conn.panel = conn.panel ? conn.panel: {}
let roseSet = db.data.txt2img || {};
const eggid = 1
const location = 5
const prefix = usedPrefix 
const tanggal = new Date()
const pler = JSON.parse(fs.readFileSync('./database/idgrup.json').toString())
const jangan = m.isGroup ? pler.includes(m.chat) : false	
const pp = await conn.profilePictureUrl(m.sender, 'image').catch((_) => "https://telegra.ph/file/1ecdb5a0aee62ef17d7fc.jpg");
switch (command) {
case 'listpanel':{
let panel = ["\n   -   1gb✅\n   -   2gb✅\n   -   3gb✅\n   -   4gb✅\n   -   5gb✅\n   -   6gb✅\n   -   7gb✅\n   -   8gb✅\n   -   unli✅"];
let msgs = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                "messageContextInfo": {
                    "deviceListMetadata": {},
                    "deviceListMetadataVersion": 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: '📍 Bᴇʀɪᴋᴜᴛ ᴀᴅᴀʟᴀʜ ʟɪsᴛ ᴘᴀɴᴇʟ ʏᴀɴɢ ᴛᴇʀsᴇᴅɪᴀ ᴅɪ ᴀᴇᴛʜᴇʀᴢʙᴏᴛᴢ:' + panel + '\n`ᴊɪᴋᴀ ᴍᴀᴜ ᴏʀᴅᴇʀ sɪʟᴀᴋᴀɴ ᴄʜᴀᴛ ᴏᴡɴᴇʀ ʏᴀ ᴋᴀᴋᴋ, ɪɴɪ ɴᴏᴍᴏʀɴʏq` 👉:wa.me/6285798045817',
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: wm
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        title: "", 
                        subtitle: "",
                        hasMediaAttachment: true,
                        ...await prepareWAMessageMedia({
                            image: {
                                url: thumb,
                            }
                        }, {
                            upload: conn.waUploadToServer
                        })

                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: [{
              }
           ],
          }), 
          contextInfo: {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterName: "🔮 ⌜ ᴀᴇᴛʜᴇʀᴢʙᴏᴛᴢ ⌟│©ᴀᴇᴛʜᴇʀ 🔮",
              newsletterJid: "120363354653620526@newsletter",
              serverMessageId: 143
            }
          }
        })
    }
  }
}, { quoted: { key: { participant: '0@s.whatsapp.net', remoteJid: "0@s.whatsapp.net" }, message: { conversation: 'ᴀᴇᴛʜᴇʀᴢʙᴏᴛᴢ Terverifikasi Oleh WhatsApp'}}});
    await conn.relayMessage(m.chat, msgs.message, {
        messageId: m.key.id
    })
}
break
case 'panel': case 'pannel':{
if(!text) throw "[ 📮 Input nama, nomor ]"
let t = text.split(',');
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
conn.panel[0] = username
conn.panel[1] = u
let panel = ["1gb✅","2gb✅","3gb✅","4gb✅","5gb✅","6gb✅","7gb✅","8gb✅","unli✅"];
let cmd = ["1gb","2gb","3gb","4gb","5gb","6gb","7gb","8gb","unli"];
let list = panel.map((data, index) => ({ panel: data, cmd: cmd[index] }))
let sections = [
    {
        title: "AETHERZBOTZ by AETHER",
        highlight_label: 'Back To Menu',
        rows: [
            {
                header: wm,
                title: "Mᴇɴᴜ 💬",
                description: kembali ke menu utama,
                id: '.menu'
            },
            {
                header: wm,
                title: "Oᴡɴᴇʀ ʙᴏᴛ 👤",
                description: "Mengetahui,pemilik AETHERZBOTZ",
                id: '.owner'
            }
        ]
    }
];

list.forEach((item) => {
    sections.push({
        title: "ᴅᴀғᴛᴀʀ ᴘᴀɴᴇʟ ʙʏ ᴀᴇᴛʜᴇʀ 💙",
        rows: [
            {
                title: 📍 PANEL RAM ${item.panel.toUpperCase()},
                description: CREATE PANEL DENGAN RAM ${item.panel.toUpperCase()},
                id: .${item.cmd} ${conn.panel[0]},${conn.panel[1]}
            }
        ]
    });
});

let listMessage = {
    title: 'LIST PANEL 📮',
    sections
};
let msgs = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                "messageContextInfo": {
                    "deviceListMetadata": {},
                    "deviceListMetadataVersion": 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: Bᴇʀɪᴋᴜᴛ ᴀᴅᴀʟᴀʜ ᴅᴀᴛᴀ ᴘᴀɴᴇʟ ʏᴀɴɢ ᴀᴅᴀ ᴘᴀᴅᴀ ᴀᴇᴛʜᴇʀᴢ, 
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: wm
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        title: "", 
                        subtitle: "",
                        hasMediaAttachment: true,
                        ...await prepareWAMessageMedia({
                            image: {
                                url: thumb,
                            }
                        }, {
                            upload: conn.waUploadToServer
                        })

                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: [{
                "name": "single_select",
                "buttonParamsJson": JSON.stringify(listMessage)
              },             
              {
                 "name": "cta_url",
                 "buttonParamsJson": "{\"display_text\":\"ɪɴғᴏ ʙᴏᴛ ᴀᴇᴛʜᴇʀᴢʙᴏᴛᴢ 🌐\",\"url\":\"https://whatsapp.com/channel/0029VaytwYK1t90iXAvaO62s\",\"merchant_url\":\"https://www.google.com\"}"
              }
           ],
          }), 
          contextInfo: {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterName: "🔮 ⌜ ᴀᴇᴛʜᴇʀᴢʙᴏᴛᴢ ⌟│©ᴀᴇᴛʜᴇʀ 🔮",
              newsletterJid: "120363354653620526@newsletter",
              serverMessageId: 143
            }
          }
        })
    }
  }
}, {quoted:m})
    await conn.relayMessage(m.chat, msgs.message, {
        messageId: m.key.id
    })
}
            break
  }
}
handler.command = handler.help = ['listpanel','pannel','panel']
handler.tags = ['panel']
handler.rowner = false
module.exports = handler;