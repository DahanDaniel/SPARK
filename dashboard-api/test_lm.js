const axios = require('axios');
require('dotenv').config({path: '.env'});

async function check() {
  const url = 'http://localhost:9000/api/campaigns?per_page=300';
  const auth = { username: process.env.LISTMONK_API_USER, password: process.env.LISTMONK_API_PASS };
  try {
    const res = await axios.get(url, { auth });
    const camps = res.data.data.results;
    console.log("Total fetched:", camps.length);
    const grz = camps.filter(c => c.name.toLowerCase().includes('grzegorz'));
    console.log("Found Grzegorz:", grz.map(c => c.name));
    
    // Check mapping logic
    const mapped = grz.map(camp => {
        let project = 'Inne';
        const lowerName = camp.name.toLowerCase();
        
        const PROJECT_MAPPING = {
            'uporzadkuj': 'SPARK',
            'grzegorz kuca': 'VIRAL',
        };

        for (const [key, explicitProject] of Object.entries(PROJECT_MAPPING)) {
            if (lowerName.includes(key) || (camp.tags || []).join(' ').toLowerCase().includes(key)) {
                project = explicitProject;
                break;
            }
        }
        return { name: camp.name, project };
    });
    console.log("Mapped Projects:", mapped);
  } catch (e) {
    console.error("API Error", e.message);
  }
}
check();
