const { google } = require('googleapis');
const credentials = require('./google_oauth.json');
const token = require('./token.json');

const { client_secret, client_id, redirect_uris } = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
oAuth2Client.setCredentials(token);

// We'll inspect two sheets to see the common structure
const sheetIds = [
    '1SdCWUP4TRYwvob9mV5sMAO7vL9n7ia2UbQCTg_TB3do', // SPARK
    '1JE-MshIDynBZawKTERWxNzp23v4TveCp5hhAgIOPGdM'  // GLG
];

async function inspectSheets() {
    try {
        const sheets = google.sheets({version: 'v4', auth: oAuth2Client});
        
        for (const id of sheetIds) {
            console.log(`\n\n=== SPRAWDZAM ARKUSZ: ${id} ===`);
            const res = await sheets.spreadsheets.get({ spreadsheetId: id });
            
            // Get the first sheet's title
            const sheetTitle = res.data.sheets[0].properties.title;
            console.log(`Główna zakładka: "${sheetTitle}"`);
            
            // Fetch A1:Z5 to see columns and first few rows
            const dataRes = await sheets.spreadsheets.values.get({
                spreadsheetId: id,
                range: `${sheetTitle}!A1:Z5`,
            });
            
            console.log('\nNagłówki (wiersz 1):');
            console.log(dataRes.data.values[0]);
            
            console.log('\nPrzykładowy wiersz (wiersz 2):');
            if (dataRes.data.values.length > 1) {
                console.log(dataRes.data.values[1]);
            } else {
                console.log('Brak danych w wierszu 2');
            }
        }
    } catch (error) {
        console.error('Błąd odczytu arkusza:', error.message);
    }
}

inspectSheets();
