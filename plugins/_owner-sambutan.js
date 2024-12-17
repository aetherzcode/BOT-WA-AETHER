const owner3 = '628XXX@s.whatsapp.net';

// variabel di atas di isi nomor yang ingin di buat sambutan, ganti sama nomor kalian!


let handler = m => m
handler.before = async function(m, { conn, participants, isPrems, isAdmin }) {
  if (!conn.danil_join) {
    conn.danil_join = {
      join: false,
      time: 0,
    };
  }
  const currentTime = Math.floor(Date.now() / 1000);

  if (!m.isGroup || conn.danil_join.time > currentTime) {
    // console.log("cooldown"); //cek di console server kalau muncul ini berarti masih cooldown
    return;
  }
  let messageText = "";
  let mentionedUsers = participants.map((u) => u.id).filter((v) => v !== conn.user.jid);
  switch (m.sender) {
    // case `${owner1}`:
    //   messageText = "📣 *Perhatian semua* 📣, Owner telah datang";
    //   break;
    // case `${owner2}`:
    //   messageText = "📣 *Perhatian semua* 📣, Owner bot datang";
    //   break;
    case `${owner3}`:
      messageText = "📣 *Perhatian semua* 📣, admin bot telah datang, beri hormat semua!!!";
      break;
    // case "628XXX@s.whatsapp.net":
    //   messageText = "📣 *Perhatian semua*, Owner bot datang";
    //   break;  
  }
  //yang di kasih tanda // bisa di hilangkan jika ingin di pakai
  if (messageText) {
    await conn.sendMessage(
      m.chat,
      {
        text: messageText,
      },
      {
        quoted: m,
        mentions: mentionedUsers,
      }
    );
    conn.danil_join = {
      join: true,
      time: currentTime + 1000, //
    };
  } 
}

module.exports = handler
