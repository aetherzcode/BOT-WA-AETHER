const { proto } = require('@adiwajshing/baileys').default;

function msToDate(ms) {
    let temp = ms;
    let days = Math.floor(temp / (24 * 60 * 60 * 1000));
    let daysms = temp % (24 * 60 * 60 * 1000);
    let hours = Math.floor((daysms) / (60 * 60 * 1000));
    let hoursms = daysms % (60 * 60 * 1000);
    let minutes = Math.floor((hoursms) / (60 * 1000));
    let minutesms = hoursms % (60 * 1000);
    let sec = Math.floor((minutesms) / 1000);
    return `${days} hari ${hours} jam ${minutes} menit`;
}

let handler = async (m, { conn, args, command, usedPrefix }) => {
    let who;
    if (args.length === 1) {
        who = m.isGroup ? m.chat : args[0];
    } else if (args.length === 2) {
        who = args[0];
    } else {
        who = m.isGroup ? m.chat : null;
    }

    switch (command) {
        case 'addsewa':
            if (!args[0] || isNaN(args[args.length - 1])) throw `Masukkan angka yang mewakili jumlah hari!\n*Misal : ${usedPrefix + command} <link grup> 30* atau ${usedPrefix + command} 30*`;

            let jumlahHari = 86400000 * args[args.length - 1];
            let now = new Date() * 1;

            if (!who) throw `Gunakan format yang benar: ${usedPrefix + command} <link grup> <jumlah hari> atau ${usedPrefix + command} <jumlah hari>`;
            if (!global.db.data.chats[who]) global.db.data.chats[who] = {};

            if (global.db.data.chats[who].expired && now < global.db.data.chats[who].expired) {
                global.db.data.chats[who].expired += jumlahHari;
            } else {
                global.db.data.chats[who].expired = now + jumlahHari;
            }
            conn.reply(m.chat, `Berhasil menetapkan hari kadaluarsa untuk Grup ini selama ${args[args.length - 1]} hari.\n\nHitung Mundur: ${msToDate(global.db.data.chats[who].expired - now)}`, m);
            break;

        case 'delsewa':
            if (!who) throw `Gunakan format yang benar: ${usedPrefix + command} <link grup>`;
            if (!global.db.data.chats[who]) throw `Grup tidak ditemukan di database.`;

            global.db.data.chats[who].expired = false;
            conn.reply(m.chat, `Berhasil menghapus hari kadaluarsa untuk Grup ini`, m);
            break;

        case 'listsewa':
            let sewaList = Object.keys(global.db.data.chats).filter(chatId => global.db.data.chats[chatId].expired);
            if (sewaList.length === 0) {
                conn.reply(m.chat, `Tidak ada grup yang memiliki masa sewa aktif.`, m);
            } else {
                let listText = 'Grup dengan masa sewa aktif:\n\n';
                for (let chatId of sewaList) {
                    let remainingTime = global.db.data.chats[chatId].expired - new Date() * 1;
                    listText += `ID: ${chatId}\nMasa Aktif: ${msToDate(remainingTime)}\n\n`;
                }
                conn.reply(m.chat, listText, m);
            }
            break;

        case 'csewa':
            if (!who) throw `Gunakan format yang benar: ${usedPrefix + command} <link grup>`;
            if (!global.db.data.chats[who]) throw `Grup tidak ditemukan di database.`;

            let remainingTime = global.db.data.chats[who].expired - new Date() * 1;
            if (remainingTime > 0) {
                conn.reply(m.chat, `Masa aktif sewa untuk grup ini adalah ${msToDate(remainingTime)}`, m);
            } else {
                conn.reply(m.chat, `Grup ini tidak memiliki masa sewa aktif.`, m);
            }
            break;

        default:
            throw `Perintah tidak valid: ${command}`;
    }
}

handler.help = ['addsewa <hari>', 'addsewa <link grup> <hari>', 'delsewa', 'delsewa <link grup>', 'listsewa', 'ceksewa', 'ceksewa <link grup>'];
handler.tags = ['owner'];
handler.command = /^(addsewa|delsewa|listsewa|csewa)$/i;
handler.rowner = /^(addsewa|delsewa|listsewa)$/i;
handler.group = false;
handler.private = false;
handler.register = true;

module.exports = handler;

//By: Offmonpreset
