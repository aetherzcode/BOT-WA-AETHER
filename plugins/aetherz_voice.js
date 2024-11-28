const fetch = require('node-fetch');

let handler = async (m, { conn, text }) => {
    if (!text) throw "Tolong berikan teks untuk diubah menjadi suara.";

    m.reply("Processing... Please wait.");

    try {
        // API request payload
        const payload = {
            text: text,
        };

        // API request options
        const options = {
            method: "POST",
            headers: {
                "accept": "/",
                "api_key": "free",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        };

        // API request
        const response = await fetch("https://shinoa.us.kg/api/voice/voice-miku", options);
        const result = await response.json();

        if (result.status && result.data.length > 0) {
            const audioUrl = result.data[0].miku; // Extracting the audio URL

            // Send the audio file to the user
            await conn.sendFile(m.chat, audioUrl, "voice-miku.wav", "", m);
        } else {
            throw new Error("Failed to generate voice. Please try again.");
        }
    } catch (error) {
        console.error("Error:", error);
        m.reply("An error occurred while processing your request. Please try again.");
    }
};

handler.help = ["aetherzvoice <text>"];
handler.command = ["aetherzvoice"];
handler.tags = ["ai"];

handler.limit = 2;
handler.register = true;

module.exports = handler;
