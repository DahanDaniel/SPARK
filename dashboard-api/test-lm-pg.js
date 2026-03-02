require('dotenv').config();
const listmonk = require('./services/listmonk');

async function test() {
    try {
        console.time('fetch');
        const data = await listmonk.getDashboardMetrics();
        console.timeEnd('fetch');
        console.log('Recent campaigns:', data.recent.length);
        console.log('All campaigns:', data.allCampaigns.length);
        console.log('Funnel:', data.funnel);
        console.log('Averages:', data.averages);
    } catch (e) {
        console.error(e);
    }
    process.exit(0);
}
test();
