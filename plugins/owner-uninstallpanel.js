const { Client } = require('ssh2');

let handler = async (m, { text, args, usedPrefix:_p }) => {

    let t = text.split(',');
    if (t.length < 2) return m.reply(`*Format salah!*\nPenggunaan: ${_p}uninstallpanel ipvps,password`);
    let ipvps = t[0].trim();
    let passwd = t[1].trim();
    const connSettings = {
        host: ipvps,
        port: '22',
        username: 'root',
        password: passwd
    };

    const command = 'bash <(curl -s https://pterodactyl-installer.se)';

    const conn = new Client();
    let isSuccess = false; // Flag untuk menentukan keberhasilan koneksi
    conn.on('ready', () => {
        m.reply('*PROSES UNINSTALL PANEL SEDANG BERLANGSUNG, MOHON TUNGGU 20 DETIK*');
        conn.exec(command, (err, stream) => {
            if (err) throw err;
            stream.on('close', (code, signal) => {
                console.log('Stream closed with code ' + code + ' and signal ' + signal);
                conn.end();
            }).on('data', (data) => {
                console.log('STDOUT: ' + data);
                if (data.toString().includes('Input')) {
                    if (data.toString().includes('6')) {
                        stream.write('6\n');
                    } else if (data.toString().includes('y/n')) {
                        stream.write('y\n');
                    } else {
                        stream.write('\n');
                    }
                }
            }).stderr.on('data', (data) => {
                console.log('STDERR: ' + data);
            });
        });
    }).connect(connSettings);
    await new Promise(resolve => setTimeout(resolve, 20000));
    if (isSuccess) {
            m.reply('`SUKSES UNINSTALL PANEL ANDA, SILAHKAN CEK`');
        }
   }

handler.tags = ['owner', 'tools']
handler.command = handler.help = ['uninstallpanel','uinspanel']
handler.owner = true
module.exports = handler;