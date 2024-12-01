let notes = {};
let handler = async (m, { conn, args, command }) => {
    const userId = m.sender;
    const showNotes = () => {
        const userNotes = notes[userId];
        if (userNotes && userNotes.length > 0) {
            return userNotes.map((note, index) => `${index + 1}. ${note}`).join("\n");
        }
        return "❗Tidak ada catatan ditemukan.";
    };
    switch (command) {
        case "addnote":
            if (!args.length) return m.reply("❗Tolong masukkan teks catatan.");
            const newNote = args.join(" ");
            if (!notes[userId]) notes[userId] = [];
            notes[userId].push(newNote);
            m.reply("✅ Catatan berhasil ditambahkan.");
            break;

        case "viewnotes":
            const notesList = showNotes();
            m.reply(notesList);
            break;

        case "deletenote":
            const noteIndex = parseInt(args[0]) - 1;
            if (isNaN(noteIndex) || noteIndex < 0 || noteIndex >= (notes[userId] || []).length) {
                return m.reply("❗Nomor catatan tidak valid.");
            }
            notes[userId].splice(noteIndex, 1);
            m.reply("✅ Catatan berhasil dihapus.");
            break;

        default:
            m.reply("❗Perintah tidak dikenali.");
            break;
    }
};
handler.help = ["addnote teks", "viewnote", "deletenote nomor"];
handler.tags = ["owner", "tools"];
handler.command = ["addnote", "viewnote", "deletenote"];
handler.owner = true;
module.exports = handler;