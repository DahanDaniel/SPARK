const { google } = require('googleapis');
const credentials = require('./google_oauth.json');
const token = require('./token.json');

const { client_secret, client_id, redirect_uris } = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
oAuth2Client.setCredentials(token);

async function findSheets() {
    try {
        const drive = google.drive({version: 'v3', auth: oAuth2Client});
        const response = await drive.files.list({
            q: "(name contains 'Email' or name contains 'Responses' or name contains 'Analysis') and mimeType='application/vnd.google-apps.spreadsheet'",
            fields: 'files(id, name)',
            spaces: 'drive',
        });
        
        console.log('Znalezione potencjalne arkusze dla Dashboardu CEO:');
        console.log(response.data.files);
    } catch (error) {
        console.error('Błąd wyszukiwania:', error.message);
    }
}

findSheets();
