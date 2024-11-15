const { generateWAMessageFromContent, generateWAMessageContent, proto } = require('@adiwajshing/baileys');
let handler = async (m, { conn, isROwner, text }) => {

    let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://i.ibb.co/2WzLyGk/profile.jpg');
    let fkon = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: `status@broadcast` } : {}) }, message: { 'contactMessage': { 'displayName': wm, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${wm},;;;\nFN:${wm},\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 'jpegThumbnail': pp, thumbnail: pp, sendEphemeral: true }}};

    let caption = `\`</BROADCAST SLIDE>\`
    By: @${m.sender.split('@')[0]}`;
    const delay = time => new Promise(res => setTimeout(res, time));
    let getGroups = await conn.groupFetchAllParticipating();
    let groups = Object.entries(getGroups).slice(0).map(entry => entry[1]);
    let anu = groups.map(v => v.id);
    var pesan = m.quoted && m.quoted.text ? m.quoted.text : text;
    if (!pesan) throw 'teksnya?';
    m.reply(`Mengirim Broadcast Ke ${anu.length} Chat, Waktu Selesai ${anu.length * 0.5} detik`);
    for (let i of anu) {
        await delay(500);
        let [pesan, tek, teks, inbox] = text.split('|');
        if ((!pesan, !tek, !teks, !inbox)) throw `[❗] *Masukan Text:*\n\nPenggunaan: /${usedPrefix + command} text|text|text|text\n\n*Contoh:* ${usedPrefix + command} Halo|Aku|Pedo|Salam kenal yah`;

        const url = "https://btch.pages.dev/file/7576594882b09cbf341e9.jpg";
        async function image(url) {
            const { imageMessage } = await generateWAMessageContent({
                image: { url }
            }, {
                upload: conn.waUploadToServer
            });
            return imageMessage;
        }

        let msg = generateWAMessageFromContent(
            i,
            {
                viewOnceMessage: {
                    message: {
                        interactiveMessage: {
                            body: { text: caption },
                            contextInfo: {
                                mentionedJid: conn.parseMention(caption),
                                quoted: [m],
                                isForwarded: true,
                                forwardingScore: 99999,
                                forwardedNewsletterMessageInfo: {
                                    newsletterJid: '120363294396184494@newsletter',
                                    newsletterName: 'Powered By Aether!',
                                    serverMessageId: null,
                                },
                            },
                            carouselMessage: {
                                cards: [
                                    {
                                        header: {
                                            imageMessage: await image(url),
                                            hasMediaAttachment: true,
                                        },
                                        body: { text: pesan },
                                        nativeFlowMessage: {
                                            buttons: [
                                                {
                                                    name: "cta_url",
                                                    buttonParamsJson: `{"display_text":"👤 Chat Owner","url":"https://wa.me/6285798045817","merchant_url":"https://wa.me/6285798045817"}`
                                                },
                                                {
                                                    name: "cta_url",
                                                    buttonParamsJson: `{"display_text":"🌐 Website","url":"https://aetherz.xyz","merchant_url":"https://aetherz.xyz"}`
                                                },
                                            ],
                                        },
                                    },
                                    {
                                        header: {
                                            imageMessage: await image(url),
                                            hasMediaAttachment: true,
                                        },
                                        body: { text: tek },
                                        nativeFlowMessage: {
                                            buttons: [
                                                {
                                                    name: "cta_url",
                                                    buttonParamsJson: `{"display_text":"👤 Chat Owner","url":"https://wa.me/6285798045817","merchant_url":"https://wa.me/6285798045817"}`
                                                },
                                                {
                                                    name: "cta_url",
                                                    buttonParamsJson: `{"display_text":"🌐 Website","url":"https://aetherz.xyz","merchant_url":"https://aetherz.xyz"}`
                                                },
                                            ],
                                        },
                                    },
                                    {
                                        header: {
                                            imageMessage: await image(url),
                                            hasMediaAttachment: true,
                                        },
                                        body: { text: teks },
                                        nativeFlowMessage: {
                                            buttons: [
                                                {
                                                    name: "cta_url",
                                                    buttonParamsJson: `{"display_text":"👤 Chat Owner","url":"https://wa.me/6285798045817","merchant_url":"https://wa.me/6285798045817"}`
                                                },
                                                {
                                                    name: "cta_url",
                                                    buttonParamsJson: `{"display_text":"🌐 Website","url":"https://aetherz.xyz","merchant_url":"https://aetherz.xyz"}`
                                                },
                                            ],
                                        },
                                    },
                                    {
                                        header: {
                                            imageMessage: await image(url),
                                            hasMediaAttachment: true,
                                        },
                                        body: { text: inbox },
                                        nativeFlowMessage: {
                                            buttons: [
                                                {
                                                    name: "cta_url",
                                                    buttonParamsJson: `{"display_text":"👤 Chat Owner","url":"https://wa.me/6285798045817","merchant_url":"https://wa.me/6285798045817"}`
                                                },
                                                {
                                                    name: "cta_url",
                                                    buttonParamsJson: `{"display_text":"🌐 Website","url":"https://aetherz.xyz","merchant_url":"https://aetherz.xyz"}`
                                                },
                                            ],
                                        },
                                    },
                                ],
                                messageVersion: 1
                            }
                        }
                    }
                }
            },
            { quoted: fkon }
        );

        await conn.relayMessage(msg.key.remoteJid, msg.message, {
            messageId: msg.key.id,
        }).catch(_ => _);
    }
    m.reply(`Sukses Mengirim Broadcast Ke ${anu.length} Group`);
}
handler.help = ['bcgcslide <teks>'];
handler.tags = ['owner'];
handler.command = /^(bcgcslide|bcgcs)$/i;
handler.owner = true;

module.exports = handler;