const { format } = require('date-fns');
const { id } = require('date-fns/locale');
const handler = async (m, { conn }) => {
  try {
    //waktu Asia/Jakarta
    const now = new Date();
    const timeZone = 'Asia/Jakarta';
    const jakartaTime = new Date(now.toLocaleString('en-US', { timeZone }));

    // Format waktu dan tanggal
    const hari = format(jakartaTime, 'EEEE', { locale: id });
    const tanggal = format(jakartaTime, 'd MMMM yyyy', { locale: id });
    const waktu = format(jakartaTime, 'HH:mm:ss');

    const message = `🕒 *Informasi Waktu Indonesia Saat Ini*\n\n📆 *Hari*: ${hari}\n📅 *Tanggal*: ${tanggal}\n⌚ *Waktu*: ${waktu} WIB`;
    const thumbnailUrl = 'https://files.catbox.moe/cunu9a.jpg';

    // Kirim pesan
    await conn.sendMessage(
      m.chat,
      {
        text: message,
        footer: 'Ini adalah waktu berdasarkan zona Asia/Jakarta.',
        contextInfo: {
          externalAdReply: {
            title: '🌐 Waktu Indonesia',
            body: 'Powered by AETHERZBOTZ',
            showAdAttribution: true,
            mediaType: 1,
            sourceUrl: '',
            thumbnailUrl,
            renderLargerThumbnail: true,
          },
        },
      },
      { quoted: m }
    );
  } catch (error) {
    console.error(error);
    await m.reply('Terjadi kesalahan saat mengambil informasi waktu.');
  }
};

handler.help = ['time'];
handler.tags = ['tools'];
handler.command = /^time|waktu|tanggal$/i;
module.exports = handler;