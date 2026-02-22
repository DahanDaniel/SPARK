require('dotenv').config();
const axios = require('axios');

async function fetchOneCampaign() {
    let baseURL = process.env.LISTMONK_API_URL;
    if (baseURL && baseURL.endsWith('/api')) {
        baseURL = baseURL.substring(0, baseURL.length - 4);
    }
    
    try {
        const response = await axios.get(`${baseURL}/api/campaigns/98`, {
            auth: {
                username: process.env.LISTMONK_API_USER,
                password: process.env.LISTMONK_API_PASS
            }
        });
        
        console.log(JSON.stringify(response.data.data, null, 2));

    } catch (e) {
        console.error('Błąd:', e.message);
    }
}

fetchOneCampaign();
