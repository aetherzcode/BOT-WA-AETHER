const axios = require('axios');
const { setInterval } = require('timers');

const groupChats = [
    '120363298036479484@g.us',
    '120363369124606444@g.us',
    '120363374370080774@g.us',
];

let lastGempaData = null; 

async function getGempaInfo() {
    try {
        const url = `https://api.betabotz.eu.org/api/search/gempa?apikey=${lann}`;
        const response = await axios.get(url);
        const res = response.data.result;

        if (!res) {
            console.log('Data gempa tidak tersedia');
            return;
        }


        if (lastGempaData && lastGempaData.Waktu === res.Waktu) {
            console.log('Data gempa belum berubah, tidak ada pengingat.');
            return;
        }

        lastGempaData = res; 

        const gempaInfo = {
            waktu: res.Waktu,
            lintang: res.Lintang,
            bujur: res.Bujur,
            magnitude: res.Magnitudo,
            kedalaman: res.Kedalaman,
            wilayah: res.Wilayah,
            gambar: res.Map
        };

        console.log(`
        Waktu Gempa: ${gempaInfo.waktu}
        Magnitudo: ${gempaInfo.magnitude}
        Wilayah: ${gempaInfo.wilayah}
        Gambar: ${gempaInfo.gambar}
        `);

        sendGempaReminderToGroups(gempaInfo); 
    } catch (error) {
        console.error('[❗] Terjadi kesalahan saat mengambil data gempa:', error);
    }
}

async function sendGempaReminderToGroups(gempaInfo) {
    for (const chatId of groupChats) {
        const reminderMessage = `🚨 *PENGINGAT GEMPA BUMI* 🚨\n\n🕒 Waktu: ${gempaInfo.waktu}\n🌍 Wilayah: ${gempaInfo.wilayah}\n💥 Magnitudo: ${gempaInfo.magnitude}\n🌐 Lintang: ${gempaInfo.lintang}\n🌐 Bujur: ${gempaInfo.bujur}\n🔍 Kedalaman: ${gempaInfo.kedalaman}\n📷 Gambar Peta: ${gempaInfo.gambar}\n\nJaga keselamatan kalian!`;
        await sendReminderToGroup(chatId, reminderMessage); 
    }
}

async function sendReminderToGroup(chatId, text) {
    await conn.sendMessage(chatId, { text }); 
}


function startGempaReminder() {
    setInterval(() => {
        console.log('Mengecek data gempa terbaru...');
        getGempaInfo(); 
    }, 60 * 60 * 1000); 
}

startGempaReminder(); 
