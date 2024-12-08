class Saweria {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.saweria.co/v1'; // Ganti dengan URL API yang sesuai
    }

    async createPayment(amount, packageName) {
        // Logika untuk membuat pembayaran
        // Contoh: Mengirim permintaan ke API Saweria
        try {
            const response = await fetch(`${this.baseUrl}/payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({ amount, package: packageName })
            });
            return await response.json();
        } catch (error) {
            return { status: false, msg: error.message };
        }
    }

    async checkPayment(receiptId) {
        // Logika untuk memeriksa status pembayaran
        try {
            const response = await fetch(`${this.baseUrl}/payment/${receiptId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`
                }
            });
            return await response.json();
        } catch (error) {
            return { status: false, msg: error.message };
        }
    }

    async login(email, password) {
        // Logika untuk login
        try {
            const response = await fetch(`${this.baseUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            return await response.json();
        } catch (error) {
            return { status: false, msg: error.message };
        }
    }
}

module.exports = { Saweria };