require('dotenv').config();
const listmonkService = require('./services/listmonk');
const googleSheetsService = require('./services/googleSheets');

async function testServices() {
    console.log('--- TEST LISTMONK ---');
    const lm = await listmonkService.getDashboardMetrics();
    console.dir(lm, { depth: null });

    console.log('\n--- TEST GOOGLE SHEETS ---');
    const gs = await googleSheetsService.getLeadMetrics();
    console.dir(gs, { depth: null });
    
    console.log('\n=== ZAKOŃCZONO TEST ===');
    process.exit(0);
}

testServices();
