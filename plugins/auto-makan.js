module.exports = {
    before: async function (m) {
        this.automakan= this.automakan || {}
        let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? this.user.jid : m.sender
        let id = m.chat
        // var utama
        let jadwalmakan = {
                makanpagi: "07:00",
                makansiang: "12:00",
                makanmalam: "19:00",
                makantengahmalam: "23:00",

            }
        const date = new Date((new Date).toLocaleString("en-US", {
            timeZone: "Asia/Jakarta"
        }));
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
        let isActive = Object.values(this.automakan).includes(true);
        if (id in this.automakan && isActive) {
            return false
        }
    
        for (const [makan, waktu] of Object.entries(jadwalmakan)) {
            if (timeNow === waktu && !(id in this.automakan)) {
                let caption = `Hai kak @${who.split`@`[0]},\nWaktu *${makan}* telah tiba, ambilah nasi dan lauk dan segera makan.\n\n*${waktu}*\nSegera isi perutmu dengan makanan yang *bergizi!*\nMakanlah dengan penuh rasa syukur dan nikmati setiap suapannya!`
                this.automakan[id] = [
                    this.reply(m.chat, caption, null, {
                        contextInfo: {
                            mentionedJid: [who]
                        }
                    }),
                    setTimeout(() => {
                        delete this.automakan[id]
                    }, 57000)
                ]
            }
        }
    },
    disabled: false
    }