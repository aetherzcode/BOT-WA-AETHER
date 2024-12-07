const axios = require('axios');
const { setInterval } = require('timers');

const groupChats = [
    'jid@g.us',
];

let lastGempaData = null;

async function getGempaInfo() {
    try {
        const url = `https://api.betabotz.eu.org/api/search/gempa?apikey=${lann}`;
        const response = await axios.get(url);
        const res = response.data.result;

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
        Gambar: ${gempaInfo.gambar}`);

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
    await conn.sendMessage(chatId, { text }); // Mengirim pesan langsung tanpa hide tag
}

function startGempaReminder() {
    setInterval(() => {
        console.log('Mengecek data gempa terbaru...');
        getGempaInfo();
    }, 5 * 60 * 1000); 
}

startGempaReminder();