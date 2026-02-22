const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const googleSheetsService = require('./services/googleSheets');

async function run() {
  try {
    console.log("Fetching data from Google Sheets API...");
    const res = await googleSheetsService.getLeadMetrics();
    
    if (!res || !res.allLeads) {
        console.error("No leads data returned from service.");
        return;
    }

    const allLeads = res.allLeads;
    
    console.log(`\n=== LEADS DIAGNOSTICS ===`);
    console.log(`Total Leads fetched from API: ${allLeads.length}`);
    
    // Group by Project
    const byProject = {};
    const byStatus = {};
    const projectStatusMap = {};

    allLeads.forEach(l => {
        byProject[l.project] = (byProject[l.project] || 0) + 1;
        byStatus[l.status] = (byStatus[l.status] || 0) + 1;
        
        if (!projectStatusMap[l.project]) projectStatusMap[l.project] = {};
        projectStatusMap[l.project][l.status] = (projectStatusMap[l.project][l.status] || 0) + 1;
    });

    console.log(`\n--- By Project ---`);
    console.table(byProject);

    console.log(`\n--- By Status ---`);
    console.table(byStatus);

    console.log(`\n--- Detailed Breakdown (Project -> Status) ---`);
    for (const [proj, statuses] of Object.entries(projectStatusMap)) {
        console.log(`\nProject: ${proj}`);
        console.table(statuses);
    }

  } catch (e) {
    console.error("Diagnostic Error:", e.message);
  }
}

run();
