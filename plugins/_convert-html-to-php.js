let handler = async (m, { conn, args }) => {
    // Usage example
    const query = `input html code\nEx. *.htmltophp* codehtml`;
    let htmlCode;
    if (args.length >= 1) {
        htmlCode = args.join(" ");
    } else if (m.quoted && m.quoted.text) {
        htmlCode = m.quoted.text;
    } else {
        throw query;
    }

    try {
        const phpCode = convertHtmlToPhp(htmlCode);
        await conn.sendMessage(m.chat, { text: phpCode }, { quoted: m });
    } catch (error) {
        await m.reply("Error: " + error.message);
    }
};

handler.help = ['htmltophp'];
handler.tags = ['tools'];
handler.command = /^(htmltophp)$/i;

module.exports = handler;

function convertHtmlToPhp(html) {
    return html
        .replace(/</g, "<?php echo '")
        .replace(/>/g, "'; ?>")
        .replace(/\\/g, '\\\\');
}
