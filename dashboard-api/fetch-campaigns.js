require('dotenv').config();
const axios = require('axios');

async function fetchAllCampaigns() {
    let baseURL = process.env.LISTMONK_API_URL;
    if (baseURL && baseURL.endsWith('/api')) {
        baseURL = baseURL.substring(0, baseURL.length - 4);
    }
    
    try {
        const response = await axios.get(`${baseURL}/api/campaigns`, {
            params: { per_page: 100, page: 1 },
            auth: {
                username: process.env.LISTMONK_API_USER,
                password: process.env.LISTMONK_API_PASS
            }
        });
        
        const campaigns = response.data.data.results || [];
        console.log(`Pobrano ${campaigns.length} kampanii.`);
        
        // Print out names and stats to see why stats are 0
        campaigns.forEach(c => {
            console.log(`[ID: ${c.id}] ${c.name} | Status: ${c.status} | Sent: ${c.stats?.sent} | Opened: ${c.stats?.opened} | Views: ${c.views}`);
        });

    } catch (e) {
        console.error('Błąd:', e.message);
    }
}

fetchAllCampaigns();
