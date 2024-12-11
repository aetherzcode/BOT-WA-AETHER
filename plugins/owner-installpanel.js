const { Client } = require('ssh2');

let handler = async (m, { conn, text, args, usedPrefix:_p, command }) => {
conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
try { 
let cmd = command
let [hos, usr, pw, subdo] = text.split('|');
    if ((!hos, !usr, !pw, !subdo)) throw `[❗] Contoh Penggunaan:
${_p + cmd} host|password <domain>
${_p + cmd} 1.1.1.1|1234|${domain}`

const steps = [
"bash <(curl -s https://pterodactyl-installer.se)",
"0",
"Therz",
"Therz",
"Asia/Jakarta",
"Therz@aetherz.xyz",
"Therz@aetherz.xyz",
"admin",
"admin",
"admin",
"Therz@aetherz.xyz",
"y",
"y",
"y",
"y",
"y",
"yes",
"A",
"c",
"y"
];

const conn = new Client()

conn.on('ready', () => {
console.log('Client :: ready');
conn.shell((err, stream) => {
if (err) throw err;

let currentStep = 0;

stream.on('close', () => {
console.log('Stream :: close');
conn.end();
}).on('data', (data) => {
const response = data.toString('utf8').trim();

if (response.includes('(yes/no)')) {
stream.write(`${steps[currentStep]}\n`);
} else {
m.reply(response)
}

currentStep++;

if (currentStep === steps.length) {
stream.write('exit\n');
}
});
});
}).connect({
host: hos,
port: 22,
username: 'root',
password: pw
});
m.reply('Sedang menjalankan instalasi Pterodactyl Panel...')
m.reply(`*DATA PANEL ANDA*\n\n*USERNAME:* admin\n*PASSWORD:* admin\n*LOGIN:* ${subdo}\n\nNote: Semua Instalasi Telah Selesai Silahkan Create Allocation Di Node Yang Di buat Oleh Bot Dan Ambil Token Configuration dan ketik .startwings (token) \nNote: *HARAP TUNGGU 1-5MENIT BIAR WEB BISA DI BUKA*`);
} catch (e) {
console.error(e);
return m.reply(`Terjadi kesalahan dalam menjalankan permintaan Anda.\n\n${e.message}`)
}
}
handler.tags = ['owner', 'tools']
handler.command = handler.help = ['installpanel']
handler.owner = true
module.exports = handler;