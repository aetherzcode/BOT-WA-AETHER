const moment = require('moment-timezone');

export async function before(m) {
    this.autosholat = this.autosholat || {};

    const chatIds = ["120363298036479484@g.us", "120363369124606444@g.us", "6285798045817@s.whatsapp.net"]; //buat kasih notif reminder dri id bisa id grup atau id nomor wa
    const jadwalSholat = {
        Subuh: "03:55",
        Dhuha: "05:40",
        Dhuhur: "11:32",
        Ashar: "14:56",
        Maghrib: "17:46",
        Isya: "19:01",
    }; //sesuaikan jadwal shalat daerah mu le

    const date = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const day = date.getDay();
    const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

    for (let id of chatIds) {
        if (!this.autosholat[id]) {
            this.autosholat[id] = {};
        }
        //kalo hari ke 5/hari jumat waktu shalat Dhuhur bakal ke ganti Shalat Jumat buat waktu nya si sama aja kek dhuhur
        for (const [sholat, waktu] of Object.entries(jadwalSholat)) {
            if (day === 5 && sholat === "Dhuhur") {
                const waktuJumat = waktu;
                const [jumatHours, jumatMinutes] = waktuJumat.split(":").map(Number);

                const time30MenitJumat = moment(waktuJumat, "HH:mm").subtract(30, "minutes").format("HH:mm");
                const time15MenitJumat = moment(waktuJumat, "HH:mm").subtract(15, "minutes").format("HH:mm");

                if (timeNow === time30MenitJumat && !this.autosholat[id].reminder30Jumat) {
                    await this.reply(id, `30 menit lagi waktu shalat Jumat. Segera persiapkan diri.`); //teks nya bebas mau di ganti apa sesuai selera(opsional)
                    this.autosholat[id].reminder30Jumat = true;
                }

                if (timeNow === time15MenitJumat && !this.autosholat[id].reminder15Jumat) {
                    await this.reply(id, `15 menit lagi waktu shalat Jumat. Segera ke masjid terdekat.`); //teks nya bebas mau di ganti apa sesuai selera(opsional)
                    this.autosholat[id].reminder15Jumat = true;
                }

                if (timeNow === waktuJumat && !this.autosholat[id].reminderSholatJumat) {
                    await this.reply(id, `${waktu}\nSaat ini sudah masuk waktu shalat Jumat. Selamat menunaikan ibadah shalat Jumat.`); //teks nya bebas mau di ganti apa sesuai selera(opsional)
                    this.autosholat[id].reminderSholatJumat = true;
                }

                continue;
            }

            const [sholatHours, sholatMinutes] = waktu.split(":").map(Number);
            const time30Menit = moment(waktu, "HH:mm").subtract(30, "minutes").format("HH:mm");
            const time15Menit = moment(waktu, "HH:mm").subtract(15, "minutes").format("HH:mm");

            if (!this.autosholat[id][sholat]) {
                this.autosholat[id][sholat] = { reminder30: false, reminder15: false, reminderSholat: false };
            }

            if (timeNow === time30Menit && !this.autosholat[id][sholat].reminder30) {
                await this.reply(id, `30 menit lagi waktu *${sholat}*. Persiapkan diri untuk melaksanakan shalat.`); //teks nya bebas mau di ganti apa sesuai selera(opsional)
                this.autosholat[id][sholat].reminder30 = true;
            }

            if (timeNow === time15Menit && !this.autosholat[id][sholat].reminder15) {
                await this.reply(id, `15 menit lagi waktu *${sholat}*. Segera menuju masjid.`); //teks nya bebas mau di ganti apa sesuai selera(opsional)
                this.autosholat[id][sholat].reminder15 = true;
            }

            if (timeNow === waktu && !this.autosholat[id][sholat].reminderSholat) {
                await this.reply(id, `${waktu}\nSaat ini waktu *${sholat}* telah tiba. Silakan melaksanakan shalat.`); //teks nya bebas mau di ganti apa sesuai selera(opsional)
                this.autosholat[id][sholat].reminderSholat = true;
            }
        }

        if (day === 4 && timeNow === "17:00" && !this.autosholat[id].reminderWaqiah) {
            await this.reply(id, `${waktu}\nJangan lupa membaca Surah Al-Waqiah dan Yasin, karena malam ini malam Jumat.`); //pengingat baca surah Al-Waqiah dan Yasin pada saat malam Jum'at 
            this.autosholat[id].reminderWaqiah = true;
        }

        if (timeNow === "00:00") {
            this.autosholat[id] = {};
        }
    }
}

exports.disabled = false;