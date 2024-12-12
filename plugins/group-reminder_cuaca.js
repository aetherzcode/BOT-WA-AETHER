const axios = require('axios');
const { setInterval } = require('timers');

const groupChats = [
    'jid1@g.us', 
    'jid2@g.us', 
];

let location = 'Jakarta'; 

async function getWeatherInfo() {
    try {
        const url = `https://api.betabotz.eu.org/api/tools/cuaca?query=${encodeURIComponent(location)}&apikey=${lann}`;
        const response = await axios.get(url);
        const res = response.data.result;

        if (!res) {
            console.log('Data cuaca tidak tersedia');
            return;
        }

        const weatherInfo = {
            location: res.location,
            country: res.country,
            weather: res.weather,
            currentTemp: res.currentTemp,
            maxTemp: res.maxTemp,
            minTemp: res.minTemp,
            humidity: res.humidity,
            windSpeed: res.windSpeed,
        };

        console.log(`
        Lokasi: ${weatherInfo.location}
        Cuaca: ${weatherInfo.weather}
        Suhu saat ini: ${weatherInfo.currentTemp}
        Suhu tertinggi: ${weatherInfo.maxTemp}
        Suhu terendah: ${weatherInfo.minTemp}
        Kelembapan: ${weatherInfo.humidity}
        Angin: ${weatherInfo.windSpeed}
        `);

        sendWeatherReminderToGroups(weatherInfo);
    } catch (error) {
        console.error('[❗] Terjadi kesalahan saat mengambil data cuaca:', error);
    }
}

async function sendWeatherReminderToGroups(weatherInfo) {
    for (const chatId of groupChats) {
        const reminderMessage = `🌤️ *PENGINGAT CUACA* 🌤️\n\n📍 Lokasi: ${weatherInfo.location}\n🌍 Negara: ${weatherInfo.country}\n🌦️ Cuaca: ${weatherInfo.weather}\n🌡️ Suhu saat ini: ${weatherInfo.currentTemp}\n🌡️ Suhu tertinggi: ${weatherInfo.maxTemp}\n🌡️ Suhu terendah: ${weatherInfo.minTemp}\n💧 Kelembapan: ${weatherInfo.humidity}\n🌬️ Angin: ${weatherInfo.windSpeed}\n\nTetap waspada dan jaga kesehatan!`;
        await sendReminderToGroup(chatId, reminderMessage);
    }
}

async function sendReminderToGroup(chatId, text) {
    await conn.sendMessage(chatId, { text }); // Kirim pesan langsung ke grup
}

function checkTimeAndSendWeather() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    if (hours === 6 && minutes === 0) { // Jika jam 06:00
        console.log('Mengambil data cuaca terbaru...');
        getWeatherInfo(); 
    }
}

function startDailyWeatherReminder() {
    setInterval(() => {
        checkTimeAndSendWeather(); 
    }, 60 * 1000); 
}

startDailyWeatherReminder(); 
