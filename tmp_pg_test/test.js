const { Client } = require('pg');
const client = new Client({
  host: 'news.growthpartner.com.pl',
  port: 5434,
  user: 'listmonk',
  password: 'hgxtepXln%JKjs@34nf^wW3SvJb1azxtfSQdMbhP',
  database: 'listmonk',
});
client.connect()
  .then(() => {
    console.log('Connected to database successfully!');
    return client.query('SELECT COUNT(*) FROM campaigns;');
  })
  .then(res => {
    console.log('Campaign count:', res.rows[0].count);
    return client.query('SELECT id, name, type, status FROM campaigns LIMIT 5;');
  })
  .then(res => {
     console.table(res.rows);
  })
  .catch(err => console.error('Connection error', err.stack))
  .finally(() => client.end());
