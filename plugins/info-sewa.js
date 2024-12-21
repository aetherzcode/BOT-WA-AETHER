let handler = async(m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `
*— AETHERZ JOIN GROUP*

*30 Day join the group*
- Harga: Rp. 10.000 IDR
- ID Pesanan: G30

*60 Day join the group*
- Harga: Rp. 20.000 IDR
- ID Pesanan: G60

*No Limit Day join the group*
- Harga: Rp. 35.000 IDR
- ID Pesanan: G∞


*— PREMIUM USER*

*30 Day premium*
- Harga: Rp. 5.000 IDR
- ID Pesanan: 30day

*60 Day premium*
- Harga: Rp. 10.000 IDR
- ID Pesanan: 60day

*90 Day premium*
- Harga: Rp. 15.000 IDR
- ID Pesanan: 90day


*Example:* ${usedPrefix + command} <ID Pesanan>
*Example:* ${usedPrefix + command} 30day
`, m);

    let orderID;

    // Menentukan nominal berdasarkan ID pesanan
    switch(text.toLowerCase()) {
        case '30day':
            orderID = '5.000 IDR';
            break;
        case '60day':
            orderID = '10.000 IDR';
            break;
        case '90day':
            orderID = '15.000 IDR';
            break;
        case 'nolimitday':
            orderID = '20.000 IDR';
            break;
        case 'g30':
            orderID = '10.000 IDR';
            break;
        case 'g60':
            orderID = '20.000 IDR';
            break;
        case 'g∞':
            orderID = '35.000 IDR';
            break;
        default:
            throw `*ID Pesanan* yang dipilih tidak tersedia, silakan pilih *ID Pesanan* yang valid.`;
    }

    // Pesan pembayaran
    let aetherzx = `
*— AETHER ORDER*

• *Status:* 🟡 Pending
• *ID Pembelian:* ${text}
• *Nominal:* ${orderID}
• *Payment:* QRIS

*TAHAP-TAHAP Pembayaran*
1. Silahkan SCAN QRIS ini dengan M-Banking/E-Wallet kamu.
2. Masukan Nominal: ${orderID}.
3. Kirim bukti pembayaran ke nomor berikut: wa.me/${global.numberowner}.
`;

    await conn.sendMessage(m.sender, { image: { url: global.Qris }, caption: aetherzx }, {});
    
    if (m.chat.includes('@g.us')) {
        conn.reply(m.chat, '✔️ *PESANANMU TELAH DIBUAT*\n\nSaya telah mengirim detail pembayaran melalui private chat. Silakan cek dan ikuti tahap-tahap pembayaran. Terima kasih!', m);
    }

    conn.sendMessage(global.numberowner + "@s.whatsapp.net", { 
        text: `@${m.sender.split('@')[0]} sedang melakukan pembayaran dengan nominal ${orderID}.`, 
        contextInfo: { mentionedJid: [m.sender] }
    });
};

handler.help = ['sewa', 'order'];
handler.tags = ['info'];
handler.command = /(order|sewabot|sewa|premium)/i;

module.exports = handler;