const axios = require('axios');
const cheerio = require('cheerio');

let handler = async (m, { conn, text, command, usedPrefix }) => {
    if (!text) throw '.jadwal <kelas>';

    const allData = await scrapeData(text);

    if (allData.length === 0) {
        return conn.reply(m.chat, 'Tidak ada data yang ditemukan.', m);
    }

    let batchSize = 20; 
    let totalData = allData.length;
    let batches = Math.ceil(totalData / batchSize); // Hitung jumlah batch

    for (let i = 0; i < batches; i++) {
        let start = i * batchSize;
        let end = (i + 1) * batchSize;
        let batchData = allData.slice(start, end);

        let message = batchData.map((data, index) => (
            `\nKelas: ${data.Kelas}\nHari: ${data.Hari}\nMata Kuliah: ${data.Mata_kuliah}\nWaktu: ${data.Waktu}\nRuang: ${data.Ruang}\nDosen: ${data.Dosen}\n`
        )).join('\n-----------------------------\n');

        await m.reply(message);

        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    conn.reply(m.chat, `Semua data sudah terkirim (${totalData} total data).`, m);
};

handler.help = ['jadwal <kelas>'];
handler.tags = ['tools'];
handler.command = /^(jadwal)$/i;
handler.group = false;

module.exports = handler;

async function scrapeData(text) { 
    const url = `http://baak.gunadarma.ac.id/jadwal/cariJadKul?_token=MMVYI8xKufDSvTKRFCnhbcr4KNSjzssaw1qSDt0g&teks=${text}`;

    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
        const rows = $('tbody tr');
        const results = [];

        rows.each((index, row) => {
            const tds = $(row).find('td');
            if (tds.length > 0) {
                const data = {
                    Kelas: $(tds[0]).text(),
                    Hari: $(tds[1]).text(),
                    Mata_kuliah: $(tds[2]).text().trim(),
                    Waktu: $(tds[3]).text().trim(),
                    Ruang: $(tds[4]).text().trim(),
                    Dosen: $(tds[5]).text().trim(),
                };
                results.push(data); 
            }
        });

        return results;
    } catch (error) {
        console.error('Error scraping data:', error);
        return [];
    }
}
