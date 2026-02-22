require('dotenv').config();
const axios = require('axios');

async function testListmonk() {
    console.log(`Pinging: ${process.env.LISTMONK_API_URL}`);
    try {
        const res = await axios.get(`${process.env.LISTMONK_API_URL}/api/campaigns`, {
             auth: {
                username: process.env.LISTMONK_API_USER,
                password: process.env.LISTMONK_API_PASS
            }
        });
        console.log('Sukces! Status:', res.status);
        console.log('Znaleziono kampanii:', res.data.data.results.length);
    } catch (e) {
        console.error('Błąd Axios:', e.message);
        if (e.response) {
            console.error('Status:', e.response.status);
            console.error('Data:', e.response.data);
        }
    }
}
testListmonk();
