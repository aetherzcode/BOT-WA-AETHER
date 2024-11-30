let handler = async (m, { conn, groupMetadata }) => {
const participants = await conn.groupMetadata(m.chat).then(metadata => metadata.participants);
  let countIndonesia = 0;
  let countMalaysia = 0;
  let countUSA = 0;
  let countOther = 0;
  let member = groupMetadata.participants.length;
  
  participants.forEach(participant => {
    const phoneNumber = participant.id.split('@')[0];
    if (phoneNumber.startsWith("62")) {
      countIndonesia++;
    } else if (phoneNumber.startsWith("60")) {
      countMalaysia++;
    } else if (phoneNumber.startsWith("1")) {
      countUSA++;
    } else if (phoneNumber.startsWith("+1")) {
      countOther++;
    } else {
      countOther++;
    }
  });
  
  const replyMessage = 
  `
┌─⊷ *ASAL NEGARA*
Jumlah Anggota Grup Berdasarkan Negara:
🇮🇩 • Indonesia: ${countIndonesia}
🇲🇾 • Malaysia: ${countMalaysia}
🇺🇲 • USA + OTHER : ${countUSA}
🏳️ • Negara Lain: ${countOther}
👥 • jumlah semua mmeber: ${member}
└──────────────
`;

  m.reply(replyMessage);
}
handler.tags = ['group']
handler.help = ['cekasalmember']
handler.command = ['cekasalmember', 'asalmember']
handler.group = true
module.exports = handler