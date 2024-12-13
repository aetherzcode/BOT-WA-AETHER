const axios = require('axios');
const cheerio = require('cheerio');

let handler = async (m, { conn, text }) => {
    if (!text) throw 'Gunakan format: .jadwal <kelas>';

    const allData = await jadwalUts(text); // Mengambil data jadwal

    if (!allData || allData.length === 0) {
        return conn.reply(m.chat, `Tidak ada data yang ditemukan untuk kelas ${text}.`, m);
    }

    let batchSize = 20;
    let totalData = allData.length;
    let batches = Math.ceil(totalData / batchSize);

    for (let i = 0; i < batches; i++) {
        let start = i * batchSize;
        let end = start + batchSize;
        let batchData = allData.slice(start, end);

        let message = batchData.map((data, index) => (
            `Kelas: ${text}\n` +
            `Hari: ${data.hari || '-'}\n` +
            `Tanggal: ${data.tanggal || '-'}\n` +
            `Mata Kuliah: ${data.mata_kuliah || '-'}\n` +
            `Waktu: ${data.waktu || '-'}\n` +
            `Ruang: ${data.ruang || '-'}\n` +
            `-----------------------------`
        )).join('\n');

        await m.reply(message);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Delay antar batch 1 detik
    }

    conn.reply(m.chat, `Semua data sudah terkirim (${totalData} total data).`, m);
};

handler.help = ['jadwaluts kelas'];
handler.tags = ['tools'];
handler.command = /^(jadwaluts)$/i;
handler.group = false;

module.exports = handler;

async function jadwalUts(kelas) {
    try {
        const url = `https://baak.gunadarma.ac.id/jadwal/cariUts?_token=tLa1RNDhmuvdbiSsQfle2ggFvVNBiUgiwORjJKxk&teks=${encodeURIComponent(kelas)}`;
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const headers = [];
        $('table tr th').each((_, th) => {
            headers.push($(th).text().trim().toLowerCase().replace(/\s+/g, '_'));
        });

        const rows = [];
        $('table tr').each((_, tr) => {
            const row = {};
            $(tr).find('td').each((index, td) => {
                row[headers[index]] = $(td).text().trim();
            });
            if (Object.keys(row).length > 0) {
                rows.push(row);
            }
        });

        const uniqueRows = rows.filter(
            (value, index, self) =>
                index === self.findIndex(
                    (t) =>
                        t.hari === value.hari &&
                        t.tanggal === value.tanggal &&
                        t.mata_kuliah === value.mata_kuliah &&
                        t.waktu === value.waktu &&
                        t.ruang === value.ruang
                )
        );

        return uniqueRows;
    } catch (error) {
        console.error('Error:', error.message);
        return [];
    }
};
