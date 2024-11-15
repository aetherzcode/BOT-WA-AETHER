var handler = async (m, { conn, text, usedPrefix, command }) => {
let q = m.quoted ? m.quoted : m;
let mime = (q.msg || q).mimetype || q.mediaType || "";
if (!mime) {
    throw `Reply image with caption *.blur*`;
} else if (!/image\/(jpe?g|png)/.test(mime)) {
	throw `Mime ${mime} is not supported`;
}
conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key }});
let xixi = await q.download()
let img = await require("../lib/uploadImage")(xixi);
try {
    let result = "https://api.popcat.xyz/blur?image=" + img
    conn.sendFile(m.chat, result, "", "ini dia kak", m)
    conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }});
} catch ({ message }) {
return message
}
}

handler.command = handler.help = ["blur"];
handler.tags = ["tools"];
handler.limit = true;
//handler.group = setting.grouponly
//handler.register = setting.regis

module.exports = handler;