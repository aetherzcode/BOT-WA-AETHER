let handler = async (m, { conn, text, usedPrefix, command }) => {
    conn.menfess = conn.menfess ? conn.menfess : {};
    if (!text) throw `*Example:* ${usedPrefix + command} ${m.sender.split`@`[0]},halo.`;
    let [jid, pesan] = text.split(',');
    if (!jid || !pesan) throw `*Example:* ${usedPrefix + command} ${m.sender.split`@`[0]},halo.`;
    jid = jid.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    let data = (await conn.onWhatsApp(jid))[0] || {};
    if (!data.exists) throw 'Nomor tidak terdaftar di WhatsApp.';
    if (jid === m.sender) throw 'Tidak bisa mengirim pesan menfess ke diri sendiri.';

    // Memastikan hanya satu sesi menfess yang berjalan
    let mf = Object.values(conn.menfess).find(mf => mf.status === true && (mf.dari === m.sender || mf.penerima === jid));
    if (mf) throw 'Masih ada sesi menfess yang berjalan. Selesaikan sesi tersebut terlebih dahulu.';

    let id = +new Date;
    let tek = `*_[ 💬 ] MENFESS CHAT_*\n@${data.jid.split("@")[0]} ada yang ngirim kamu menfess nih\n*=============*\n*Pesan:* ${pesan}\n*=============*\n\n*Silahkan ketik apapun untuk membalas pesan, ketik "Stop" untuk mengakhiri sesi menfess*`.trim();

    await conn.reply(data.jid, tek, null)
        .then(() => {
            m.reply('✅ Sukses mengirim pesan ke ' + '@' + data.jid.split("@")[0]);
            conn.menfess[id] = {
                id,
                dari: m.sender,
                penerima: data.jid,
                pesan: pesan,
                status: true
            };
        })
        .catch((err) => {
            m.reply('Gagal mengirim pesan. Pastikan nomor tersebut benar dan bisa menerima pesan.');
            console.error(err);
        });
};

handler.tags = ['main'];
handler.help = ['menfess', 'menfes'].map(v => v + ' *[nomor,pesan]*');
handler.command = /^(menfess|menfes|confess)$/i;
handler.private = true;

module.exports = handler;