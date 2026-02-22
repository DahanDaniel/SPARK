const axios = require('axios');
const fs = require('fs');
require('dotenv').config({path: '.env'});

async function fetchAll() {
  const url = 'http://localhost:9000/api/campaigns?per_page=5000';
  const auth = { username: process.env.LISTMONK_API_USER, password: process.env.LISTMONK_API_PASS };
  try {
    const res = await axios.get(url, { auth });
    const camps = res.data.data.results;
    const names = camps.map(c => c.name).join('\n');
    fs.writeFileSync('all_campaigns.txt', names);
    console.log("Written all names to all_campaigns.txt");
  } catch (e) {
    console.error("Error fetching", e.message);
  }
}
fetchAll();
