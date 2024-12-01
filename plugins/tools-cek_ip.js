let handler = async (m, { conn, command }) => {
    try {
        let response = await fetch('https://api.myip.com/');
        let data = await response.json();
        await conn.reply(m.chat, `IP Kamu: ${data.ip}`, m);

    } catch (e) {
        console.error("Error:", e);
        await conn.reply(m.chat, "error, skill isue.", m);
    }
};
handler.help = ['cekip']; 
handler.tags = ['tools']; 
handler.limit = true; 
handler.command = /^cekip$/i; 

module.exports = handler;