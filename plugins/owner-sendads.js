let handler = async (m, {
    conn,
    isOwner
}) => {
    if (!isOwner) return m.reply('Hanya owner yang dapat menggunakan perintah ini!');
    const delay = 3000; // jeda 3detik atur sendiri
    const message = `*Gak maksa buy bang, Mau promosi saja*\n
[ *SEWA BOT* ]

💸10.000 / Bulan
✅ Added 1 Group
✅ Free User Premium
✅ Unlimited Limit
✅ No prefix
✅ All fitur aktif
✅ Dsb.
Kelebihan: Dapat Membuat group bot aktif dengan berbagai fitur yang menarik serta otomatis dan fast respon!.

[ *PREMIUM USER* ]
💸 5.000 / Bulan
❌ Added 1 Group
✅ Free User Premium
✅ No prefix
✅ All fitur aktif
✅ Unlimited Limit
Kelebihan: Dapat menggunakan seluruh fitur tersedia, tanpa memikirkan limit.

📑 Full Garansi Asal ikuti peraturan saja.

Minat? Chat owner botnya saja (AETHER):
https://wa.me/6285798045817`;
    const contextInfo = {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
            title: global.info.namebot || 'Iklan Await',
            body: 'A D S - A W A I T',
            thumbnailUrl: 'https://files.catbox.moe/vfc3qb.png',
            sourceUrl: global.info.sgc || 'https://aetherz.xyz',
            mediaType: 1,
            renderLargerThumbnail: true
        },
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363354653620526@newsletter',
            newsletterName: 'Await ID • Created By AETHER',
            serverMessageId: 143
        }
    };

    let groups = Object.keys(conn.chats).filter(id => id.endsWith('@g.us')); // Hanya grup
    let totalSent = 0;
    for (let id of groups) {
        try {
            await conn.sendMessage(id, {
                text: message,
                contextInfo
            });
            totalSent++;
            await delayFunc(delay);
        } catch (e) {
            console.error(`Gagal mengirim pesan ke grup ${id}:`, e);
        }
    }
    m.reply(`Pesan iklan berhasil dikirim ke ${totalSent} grup.`);
};
const delayFunc = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

handler.help = ['sendads'];
handler.tags = ['owner'];
handler.command = /^sendads$/i;
handler.owner = true;
module.exports = handler;