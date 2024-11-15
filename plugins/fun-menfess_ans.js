const delay = time => new Promise(res => setTimeout(res, time));
let handler = m => m;

handler.before = async function (m, { conn }) {
    if (!m.chat.endsWith('@s.whatsapp.net')) return true;
    this.menfess = this.menfess ? this.menfess : {};
    let room = Object.values(this.menfess).find(room => [room.dari, room.penerima].includes(m.sender));
    
    if (room) {
        if (m.text.toLowerCase() === "stop") {
            let other = [room.dari, room.penerima].find(user => user !== m.sender);
            await conn.reply(other, "🏳️ Menfess dihentikan", null);
            await conn.reply(m.sender, "🏳️ Menfess dihentikan", null);
            delete this.menfess[room.id];
        } else {
            let other = [room.dari, room.penerima].find(user => user !== m.sender);
            let q = m.quoted ? m.quoted : m;
            let mime = (q.msg || q).mimetype || '';
            if (mime) {
                await m.copyNForward(other, true, m.quoted && m.quoted.fromMe ? {
                    contextInfo: {
                        ...m.msg.contextInfo,
                        forwardingScore: 1,
                        isForwarded: true,
                        participant: other
                    }
                } : {});
            } else {
                await conn.reply(other, "*_[ 💬 ] Pesan Menfess:_* " + m.text, null);
            }
        }
    }
    return true;
}

module.exports = handler;