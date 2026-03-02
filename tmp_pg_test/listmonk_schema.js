const { Client } = require('pg');
const client = new Client({
  host: 'news.growthpartner.com.pl',
  port: 5434,
  user: 'listmonk',
  password: 'hgxtepXln%JKjs@34nf^wW3SvJb1azxtfSQdMbhP',
  database: 'listmonk',
});
client.connect()
  .then(() => client.query(`
    SELECT id, name, sent, attribs, headers
    FROM campaigns 
    WHERE status = 'finished'
    ORDER BY created_at DESC
    LIMIT 1;
  `))
  .then(res => {
    console.log(JSON.stringify(res.rows[0], null, 2));
  })
  .catch(err => console.error(err))
  .finally(() => client.end());
