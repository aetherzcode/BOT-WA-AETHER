async function handler(m, { conn, text }) {
  if (!text) return conn.reply(m.chat, "Ketik namanya dengan benar!", m);

  const khodam = pickRandom([
    "Kaleng Cat Avian",
    "Pipa Rucika",
    "Botol Tupperware",
    "Badut Mixue",
    "Sabun GIV",
    "Sandal Swallow",
    "Jarjit",
    "Ijat",
    "Fizi",
    "Mail",
    "Ehsan",
    "Upin",
    "Ipin",
    "sungut lele",
    "Tok Dalang",
    "Opah",
    "Opet",
    "Alul",
    "Pak Vinsen",
    "Maman Resing",
    "Pak RT",
    "Admin ETI",
    "Bung Towel",
    "Lumpia Basah",
    "Martabak Manis",
    "Baso Tahu",
    "Tahu Gejrot",
    "Dimsum",
    "Seblak Ceker",
    "Telor Gulung",
    "Tahu Aci",
    "Tempe Mendoan",
    "Nasi Kucing",
    "Kue Cubit",
    "Tahu Sumedang",
    "Nasi Uduk",
    "Wedang Ronde",
    "Kerupuk Udang",
    "Cilok",
    "Cilung",
    "Kue Sus",
    "Jasuke",
    "Seblak Makaroni",
    "Sate Padang",
    "Sayur Asem",
    "Kromboloni",
    "Marmut Pink",
    "Belalang Mullet",
    "Kucing Oren",
    "Lintah Terbang",
    "Singa Paddle Pop",
    "Macan Cisewu",
    "Vario Mber",
    "Beat Mber",
    "Supra Geter",
    "Oli Samping",
    "Knalpot Racing",
    "Jus Stroberi",
    "Jus Alpukat",
    "Alpukat Kocok",
    "Es Kopyor",
    "Es Jeruk",
    "Cappucino Cincau",
    "Jasjus Melon",
    "Teajus Apel",
    "Pop ice Mangga",
    "Teajus Gulabatu",
    "Air Selokan",
    "Air Kobokan",
    "TV Tabung",
    "Keran Air",
    "Tutup Panci",
    "Kotak Amal",
    "Tutup Termos",
    "Tutup Botol",
    "Kresek Item",
    "Kepala Casan",
    "Ban Serep",
    "Kursi Lipat",
    "Kursi Goyang",
    "Kulit Pisang",
    "Warung Madura",
    "Gorong-gorong",
  ]);

  const response = `
╭━━━━°「 *Cek Khodam* 」°
┃
┊• Nama : ${text}
┃• Khodam : *${khodam}*
╰═┅═━––––––๑
  `.trim();

  conn.reply(m.chat, response, m);
}

handler.menu = ["khodamnya"];
handler.tags = ["fun"];
handler.command = /^kodamnya|khodamnya/i;
handler.register = true;

module.exports = handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}
