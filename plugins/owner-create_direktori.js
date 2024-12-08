let fs = require('fs');
let path = require('path')
let util = require('util')

let handler = async (m, { text, usedPrefix, command }) => {

  if (!text) throw `ehemm.. teksnya mana jir?\n\npenggunaan:\n${usedPrefix + command} <nama direktori>\n\ncontoh:\n${usedPrefix + command} <nama direktori>`;

  if (command === 'tambahdir') {

    let newDir = `${text}`;

    await fs.mkdirSync(newDir);

    m.reply(`direktori ${newDir} berhasil ditambahkan`);

  } else if (command === 'hapusdir') {

    let dirPath = `${text}`;

    if (!fs.existsSync(dirPath)) throw `direktori ${text} tidak ditemukan`;

    fs.rmdirSync(dirPath, { recursive: true });

    m.reply(`direktori ${text} dan isinya berhasil dihapus`);

  }

};

handler.help = ['mkdir', 'rmdir'].map(v => v + ' <nama direktori>');

handler.tags = ['owner'];
handler.command = /^(mkdir|rmdir)$/i;
handler.rowner = true;
module.exports = handler;