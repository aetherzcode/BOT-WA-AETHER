let handler = async (m, { conn }) => {
    conn.tebakkata = conn.tebakkata ? conn.tebakkata : {}
    let id = m.chat
    if (!(id in conn.tebakkata)) throw false
    let json = conn.tebakkata[id][1]
    let ans = json.jawaban
    let clue = ans.replace(/[BCDFGHJKLMNPQRSTFWXYZ]/g, '_')
    m.reply('```' + clue + '```')
}
handler.command = /^kata/i
handler.limit = true
module.exports = handler

//gh: dana_putra13