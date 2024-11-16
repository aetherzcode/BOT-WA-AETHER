const handler = async (m, { conn, text, command }) => {
    let who = m.mentionedJid[0]
        ? m.mentionedJid[0]
        : m.quoted
        ? m.quoted.sender
        : text
        ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
        : false;

    let globalBlacklist = db.data.globalBlacklist || [];
    if (!db.data.globalBlacklist) db.data.globalBlacklist = globalBlacklist;

    let groupMetadata = await conn.groupMetadata(m.chat);
    let botAdmin = groupMetadata.participants.find(participant => participant.id === conn.user.jid)?.admin;

    if (!botAdmin) {
        return conn.reply(m.chat, 'Bot harus menjadi admin untuk mengelola blacklist dan melakukan kick.', m);
    }

    switch (command) {
        case 'blacklist':
            if (!who) return conn.reply(m.chat, 'Tag atau reply orang yang ingin di-blacklist.', m);

            try {
                if (globalBlacklist.includes(who)) throw `Nomor ${who.split(`@`)[0]} sudah ada di daftar *Blacklist* secara global.`;

                // Tambahkan pengguna ke daftar blacklist global
                globalBlacklist.push(who);
                db.data.globalBlacklist = globalBlacklist;

                await conn.reply(m.chat, `Sukses menambahkan @${who.split(`@`)[0]} ke *Blacklist* secara global.`, m, {
                    contextInfo: { mentionedJid: [who] }
                });

                // Fetch semua grup tempat bot menjadi anggota
                const allGroups = await conn.groupFetchAllParticipating();
                const groupIds = Object.keys(allGroups);

                // Kick pengguna dari semua grup di mana bot dan pengguna tersebut menjadi anggota
                for (let groupId of groupIds) {
                    const groupInfo = allGroups[groupId];
                    const isMember = groupInfo.participants.some(member => member.id === who);
                    const botIsAdmin = groupInfo.participants.some(member => member.id === conn.user.jid && member.admin);

                    if (isMember && botIsAdmin) {
                        try {
                            await conn.groupParticipantsUpdate(groupId, [who], 'remove');
                            await conn.sendMessage(groupId, {
                                text: `Pengguna @${who.split('@')[0]} telah di-blacklist secara global dan dikeluarkan dari grup ini.`,
                                mentions: [who]
                            });
                        } catch (error) {
                            console.error(`Gagal meng-kick pengguna dari grup ${groupId}:`, error.message || error);
                        }
                    }

                    // Tambahkan jeda 1 detik di antara setiap permintaan kick
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            } catch (e) {
                throw e;
            }
            break;

        case 'unblacklist':
            if (!who) throw 'Tag atau reply orang yang ingin di-unblacklist.';

            try {
                const index = globalBlacklist.indexOf(who);
                if (index === -1) throw `Nomor ${who.split(`@`)[0]} tidak ada di daftar *Blacklist* global.`;

                // Hapus pengguna dari blacklist global
                globalBlacklist.splice(index, 1);
                db.data.globalBlacklist = globalBlacklist;

                await conn.reply(m.chat, `Sukses menghapus @${who.split(`@`)[0]} dari *Blacklist* global.`, m, {
                    contextInfo: { mentionedJid: [who] }
                });
            } catch (e) {
                throw e;
            }
            break;

        case 'listblacklist':
        case 'listbl':
            let txt = `*「 Daftar Nomor Blacklist Global 」*\n\n*Total:* ${globalBlacklist.length}\n\n┌─[ *Blacklist* ]\n`;

            for (let id of globalBlacklist) {
                txt += `├ @${id.split("@")[0]}\n`;
            }
            txt += "└─•";

            return conn.reply(m.chat, txt, m, {
                contextInfo: { mentionedJid: globalBlacklist }
            });
            break;
    }
};

// Mengeluarkan otomatis pengguna yang di-blacklist jika mengirim pesan di grup mana pun
handler.before = function (m, { conn, isAdmin }) {
    if (!m.isGroup || m.fromMe) return;

    let globalBlacklist = db.data.globalBlacklist || [];

    if (globalBlacklist.includes(m.sender) && !isAdmin) {
        conn.sendMessage(m.chat, {
            text: `Pengguna @${m.sender.split('@')[0]} ada dalam daftar blacklist global dan akan dikeluarkan dari grup.`,
            mentions: [m.sender]
        });
        conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
    }
};

handler.help = ['blacklist', 'unblacklist', 'listblacklist'];
handler.tags = ['group'];
handler.command = ['blacklist', 'unblacklist', 'listbl', 'listblacklist'];
handler.admin = handler.group = true;
handler.owner = true;

module.exports = handler;

//apalah
