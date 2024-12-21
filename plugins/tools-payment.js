const qrisImage = "https://files.catbox.moe/ap9e2y.jpg"; // Gambar QRIS
const paymentDetails = `
*Metode Pembayaran Tersedia:*

1. **Dana**       : 085798045817
2. **OVO**        : 085798045817
3. **GoPay**      : 085798045817
4. **ShopeePay**  : 085798045817
5. **SeaBank**    : 901201296150
6. **BankJago**   : 104458766508
7. **Madera**     : 86100581006
8. **NeoBank**    : 5859459280114413

*Untuk QRIS, silakan scan gambar di bawah ini.*
`;

let handler = async (m, { conn }) => {
    try {
        await conn.sendMessage(m.chat, {
            image: { url: qrisImage },
            caption: paymentDetails
        }, { quoted: m });
    } catch (error) {
        m.reply(`Terjadi kesalahan saat menampilkan metode pembayaran: ${error.message}`);
    }
};

handler.command = ['payment', 'metodepembayaran'];
handler.tags = ['tools', 'info'];
handler.help = ['payment'];
handler.register = true;

module.exports = handler;
