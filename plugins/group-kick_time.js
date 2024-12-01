let handler = async (m, { conn, usedPrefix, command, args }) => {
  if (!m.isGroup) return m.reply('Perintah ini hanya bisa digunakan di grup!');

  let mentionedJid = m.mentionedJid[0];
  if (!mentionedJid) return m.reply('Anda harus menyebutkan member yang ingin di-kick!');

  let waktu = args[1];
  if (!waktu) return m.reply('Tolong masukkan waktu yang valid dalam format 1detik, 1menit, atau 1jam!');

  const convertToSeconds = (waktu) => {
    let timeValue = parseInt(waktu);
    if (waktu.endsWith('detik')) return timeValue; // jika waktu dalam detik
    if (waktu.endsWith('menit')) return timeValue * 60; // jika waktu dalam menit
    if (waktu.endsWith('jam')) return timeValue * 3600; // jika waktu dalam jam
    return 0;
  };

  let waktuInSeconds = convertToSeconds(waktu);
  if (waktuInSeconds === 0) return m.reply('Format waktu tidak valid! Gunakan format 1detik, 1menit, atau 1jam.');

  m.reply(`🔔 Member @${mentionedJid.split('@')[0]} akan di-kick dalam ${waktu} (${waktuInSeconds} detik)!`);

  setTimeout(async () => {
    try {
      await conn.groupParticipantsUpdate(m.chat, [mentionedJid], 'remove');
      m.reply(`✅ Member @${mentionedJid.split('@')[0]} telah di-kick dari grup setelah ${waktu}!`);
    } catch (e) {
      console.log(e);
      m.reply('Gagal meng-kick member!');
    }
  }, waktuInSeconds * 1000);
};

handler.help = ['papayy @user waktu'];
handler.tags = ['group'];
handler.command = /^(papayy)$/i;
handler.admin = true;
handler.group = true;
module.exports = handler;