const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const client = new Client({
  host: 'news.growthpartner.com.pl',
  port: 5434,
  user: 'listmonk',
  password: 'hgxtepXln%JKjs@34nf^wW3SvJb1azxtfSQdMbhP',
  database: 'listmonk',
});

client.connect()
  .then(() => client.query(`
    SELECT DISTINCT s.email, s.name, MAX(cv.created_at) as last_viewed_at
    FROM campaign_views cv
    JOIN subscribers s ON cv.subscriber_id = s.id
    WHERE cv.campaign_id = 139
    GROUP BY s.email, s.name
    ORDER BY last_viewed_at DESC;
  `))
  .then(res => {
    let mdContent = '# SPARK Chaos (17 Lut 2026, 07:30) - Lista otwarć\n\n';
    mdContent += `**Unikalnych kontaktów (otwarć):** ${res.rows.length}\n\n`;
    mdContent += '| Email | Imię/Nazwa | Ostatnie otwarcie (UTC) |\n';
    mdContent += '|---|---|---|\n';
    
    res.rows.forEach(row => {
      const dt = new Date(row.last_viewed_at).toISOString().replace('T', ' ').substring(0, 19);
      mdContent += `| ${row.email} | ${row.name || '-'} | ${dt} |\n`;
    });

    const outputPath = '/Users/danieldahan/.gemini/antigravity/brain/81b9f8f2-964a-4bc2-8ac4-7a6a316593f3/spark_chaos_opens.md';
    fs.writeFileSync(outputPath, mdContent);
    console.log(`Saved report to ${outputPath}`);
  })
  .catch(err => console.error(err))
  .finally(() => client.end());
