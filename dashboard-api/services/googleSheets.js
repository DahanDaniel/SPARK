const { google } = require('googleapis');
const credentials = require('../google_oauth.json');
const token = require('../token.json');

class GoogleSheetsService {
    constructor() {
        // Init OAuth client with saved token from manual terminal flow
        const { client_secret, client_id, redirect_uris } = credentials.installed;
        this.oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
        this.oAuth2Client.setCredentials(token);
        
        this.sheets = google.sheets({version: 'v4', auth: this.oAuth2Client});
        
        // Hardcoded IDs of the relevant "Email Classification" sheets found during inspection
        this.sheetIds = [
            '1SdCWUP4TRYwvob9mV5sMAO7vL9n7ia2UbQCTg_TB3do', // SPARK
            '1okp0jCDUOIuZ3ABdc9ounzypamy2puXt6DNEj1CdCGk', // SEBASTIAN_WONS
            '1JE-MshIDynBZawKTERWxNzp23v4TveCp5hhAgIOPGdM', // GLG
            '1yUZDrhzZYsl3KqD_0f6d1yXz9fxTWLCyfyeHuzcfrDo', // SZKOLENIA_AI_LUKAS
            '1Tgr_6kSP4TMZbgI5GBlYQyISH8io7KLzb4y1CeTIhFE', // MIND_TEST
            '1BOuM2jj_j-AzSA63rRcn8JQyUpJ-gbOy_148KpAZbUs', // GLG_LUKAS
            '1_px32158kCjsUwvnCFKAU8EUe5y5NER6fOqUIxLVVyM', // GLG until 25.11.2025
            '1Kpi03oqLAfh5hng5pGkmLA6m0x-GkFNjyOOMyW2gUb4', // MIND
            '17XCcNNtVLeV7RNQSFNdYu0myzICLGTjzbbqF6i7FWhI', // VIRAL
            '1Sk5eJs9tsfgajLzmwZNs0PCtCKN8o3diGUOor80f8rQ', // TRENDY
            '1iYBxcEnReJAmOtUlDRJgGcWBEuB_Fk_mmJqH9tApxbA', // PPB
            '1DjXk17eyWapu2KSaBLrse0c2867DIJgrXK48pWS3XG0'  // DIRECTO
        ];

        this.cache = null;
        this.cacheTimestamp = 0;
        this.CACHE_TTL = 5 * 60 * 1000; // 5 minutes
    }

    async getLeadMetrics() {
        if (this.cache && Date.now() - this.cacheTimestamp < this.CACHE_TTL) {
            console.log('Zwracam dane z cache arkuszy...');
            return this.cache;
        }
        let totalLeads = 0;
        let goldenLeads = 0;
        let statusBreakdown = {};
        let recentGolden = [];
        let allLeads = []; // Support for frontend filtering

        try {
            for (const id of this.sheetIds) {
                // Determine sheet name
                const meta = await this.sheets.spreadsheets.get({ spreadsheetId: id });
                const sheetTitle = meta.data.sheets[0].properties.title;
                const projectName = meta.data.properties.title.replace('Email Classification ', '');

                // Fetch data rows A:K (to cover Classification Label in G and Date in A)
                const dataRes = await this.sheets.spreadsheets.values.get({
                    spreadsheetId: id,
                    range: `${sheetTitle}!A2:K`, // Skip headers
                });

                const rows = dataRes.data.values;
                if (!rows) continue;

                // Index reference based on our inspection block:
                // [0] Date, [1] Email, [2] Name, [3] Company, [4] Subj, [5] Msg, [6] Classification
                
                rows.forEach(row => {
                    const status = row[6] || 'Unclassified';
                    const dateRaw = row[0] || '';
                    const timestamp = dateRaw ? new Date(dateRaw).getTime() : 0;
                    
                    if (status !== 'Not Interested' && status !== 'BLACKLIST' && status !== 'Unclassified') {
                        totalLeads++;
                        
                        // Push lightweight object for universal React filtering
                        allLeads.push({
                            status: status,
                            date: dateRaw || null,
                            project: projectName,
                            timestamp: timestamp
                        });
                        
                        // Populate pie chart breakdown (Unfiltered default)
                        statusBreakdown[status] = (statusBreakdown[status] || 0) + 1;

                        const isGolden = ['Interested', 'Follow-up', 'Wycena', 'Negocjacje'].includes(status);
                        
                        if (isGolden) {
                            goldenLeads++;
                            
                            recentGolden.push({
                                company: row[3] || 'Nieznana',
                                person: row[2] || row[1] || 'Nieznany',
                                project: projectName,
                                date: dateRaw || 'Brak daty',
                                details: (row[5] || '').substring(0, 80) + '...',
                                timestamp: timestamp
                            });
                        }
                    }
                });
                // Small sleep to avoid hitting per-minute quotas when requesting 12 sheets
                await new Promise(resolve => setTimeout(resolve, 500));
            }

            // Sort recent golden leads descending by exact date and take top 50 to send to frontend
            recentGolden.sort((a, b) => b.timestamp - a.timestamp);
            recentGolden = recentGolden.slice(0, 50);

            const result = {
                totalLeads,
                goldenLeads,
                statusBreakdown,
                recentGolden,
                allLeads
            };

            this.cache = result;
            this.cacheTimestamp = Date.now();

            return result;
        } catch (error) {
            console.error('Google Sheets API Error:', error.message);
            return {
                totalLeads: 0,
                goldenLeads: 0,
                statusBreakdown: {},
                recentGolden: [],
                error: 'Sheets disconnected'
            };
        }
    }
}

module.exports = new GoogleSheetsService();
