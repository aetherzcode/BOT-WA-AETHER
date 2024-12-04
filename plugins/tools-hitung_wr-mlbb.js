let handler = async (m, { text }) => {
    if (!text) return m.reply("Contoh penggunaan: *.hitungwr* 1928|68.2|70");

    // Pisahkan input berdasarkan tanda `|`
    let [tm, tw, mw] = text.split("|");

    if (!tm || !tw || !mw) return m.reply("Masukkan format dengan benar: *.hitungwr* totalMatch|totalWinrate|targetWinrate");

    // Ganti koma dengan titik untuk format desimal
    tw = tw.replace(',', '.');
    mw = mw.replace(',', '.');

    if (isNaN(tm)) return m.reply("Masukkan total Match yang valid");
    if (isNaN(tw)) return m.reply("Masukkan total Winrate yang valid");
    if (isNaN(mw)) return m.reply("Masukkan target Winrate yang valid");

    try {
        const TotalMatch = parseInt(tm, 10);
        const TotalWr = parseFloat(tw);
        const MauWr = parseInt(mw, 10);

        function rumus(TotalMatch, TotalWr, MauWr) {
            let tWin = TotalMatch * (TotalWr / 100);
            let tLose = TotalMatch - tWin;
            let sisaWr = 100 - MauWr;
            let wrResult = 100 / sisaWr;
            let seratusPersen = tLose * wrResult;
            let final = seratusPersen - TotalMatch;
            return Math.round(final);
        }

        if (MauWr === 100) {
            return m.reply("Mana bisalah 100% Mah Kocakk!!");
        }
        const resultNum = rumus(TotalMatch, TotalWr, MauWr);
        const response = `Kamu memerlukan sekitar ${resultNum} win tanpa lose untuk mendapatkan win rate ${MauWr}%`;
        m.reply(response);
    } catch (e) {
        console.error(e);
        m.reply("Terjadi kesalahan dalam menghitung.");
    }
};

handler.help = ['hitungwr'];
handler.tags = ['main', 'tools'];
handler.command = /^(hitungwr)$/i;
handler.limit = false;
handler.rowner = false;

module.exports = handler;