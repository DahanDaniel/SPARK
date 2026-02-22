const { google } = require('googleapis');
const fs = require('fs');
const http = require('http');
const url = require('url');

const SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets.readonly',
    'https://www.googleapis.com/auth/drive.readonly'
];

const credentials = require('./google_oauth.json');
const { client_secret, client_id, redirect_uris } = credentials.installed;

// Create an OAuth2 client
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, 'http://localhost:3001');

// Generate an authentication URL
const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
});

console.log('🔗 Proszę, kliknij w ten link, aby zautoryzować dostęp serwera do Google Sheets:');
console.log('');
console.log(authUrl);
console.log('');
console.log('Oczekuję na odpowiedź (serwer nasłuchuje na porcie 3001)...');

const server = http.createServer(async (req, res) => {
    try {
        if (req.url.indexOf('/') > -1) {
            const qs = new url.URL(req.url, 'http://localhost:3001').searchParams;
            const code = qs.get('code');
            if (code) {
                console.log('✅ Otrzymano kod autoryzacji! Pobieranie tokena...');
                res.end('<h1>Sukces!</h1><p>Autoryzacja przebiegla pomyslnie. Mozesz zamknac te karte.</p>');
                server.close();
                
                const { tokens } = await oAuth2Client.getToken(code);
                oAuth2Client.setCredentials(tokens);
                
                // Store the token to disk for later program executions
                fs.writeFileSync('token.json', JSON.stringify(tokens));
                console.log('💾 Token zapisany do token.json');
                
                // Now let's try to search for "Email Responses Analysis"
                const drive = google.drive({version: 'v3', auth: oAuth2Client});
                const response = await drive.files.list({
                    q: "name contains 'Email Responses Analysis' and mimeType='application/vnd.google-apps.spreadsheet'",
                    fields: 'files(id, name)',
                    spaces: 'drive',
                });
                
                console.log('Znalezione arkusze:');
                console.log(response.data.files);
                process.exit(0);
            }
        }
    } catch (e) {
        console.error(e);
        res.end('Wystąpił błąd');
    }
}).listen(3001);
