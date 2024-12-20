let isAutoResetEnabled = false; 
let autoResetTimeout = null; 

let handler = async (m, { conn, args, command }) => {
    let lim = 30; 

    if (args.length === 0) {
        
        return conn.reply(
            m.chat,
            `*'on' atau 'off'!*\n\nContoh:\n- *.${command} on* untuk mengaktifkan reset otomatis setiap jam 10:30\n- *.${command} off* untuk menonaktifkan reset otomatis`,
            null
        );
    }

    if (args[0] === 'on') {
        if (isAutoResetEnabled) {
            return conn.reply(m.chat, `*Reset limit otomatis sudah aktif!*`, null);
        }
        isAutoResetEnabled = true;
        scheduleDailyReset(conn, lim);
        conn.reply(m.chat, `*Reset limit otomatis akan dijalankan setiap jam 10:30.*`, null);
    } else if (args[0] === 'off') {
        if (!isAutoResetEnabled) {
            return conn.reply(m.chat, `*Reset limit otomatis sudah nonaktif!*`, null);
        }
        isAutoResetEnabled = false;
        cancelScheduledReset(); 
        conn.reply(m.chat, `*Reset limit otomatis dinonaktifkan.*`, null);
    } else {
        return conn.reply(
            m.chat,
            `*Argumen tidak valid!*\nHarap gunakan 'on' atau 'off'.\n\nContoh penggunaan:\n- *.${command} on*\n- *.${command} off*`,
            null
        );
    }
};


function resetLimit(conn, lim) {
    let list = Object.entries(global.db.data.users);
    list.map(([user, data]) => (Number(data.limit = lim)));
    conn.reply('120363376612967837@newsletter', `*Limit berhasil direset ${lim} / user*`, null);
 // Kirim info ke grup tertentu
}

function getTimeUntilMidnight() {
    let now = new Date();
    let nextMidnight = new Date(now);
    nextMidnight.setHours(10, 30, 0, 0); 
    return nextMidnight - now;
}


function scheduleDailyReset(conn, lim) {
    let timeUntilMidnight = getTimeUntilMidnight();

    autoResetTimeout = setTimeout(() => {
        if (isAutoResetEnabled) {
            console.log(`Mereset limit pengguna menjadi ${lim}`);
            resetLimit(conn, lim); 
            scheduleDailyReset(conn, lim); 
        }
    }, timeUntilMidnight); 
}


function cancelScheduledReset() {
    if (autoResetTimeout) {
        clearTimeout(autoResetTimeout); 
        autoResetTimeout = null;
    }
}

handler.help = ['resetauto'].map(v => 'on/off' + v);
handler.tags = ['owner'];
handler.command = /^(resetauto|rli)$/i;

handler.owner = true;

module.exports = handler;
