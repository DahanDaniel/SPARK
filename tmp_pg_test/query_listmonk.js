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
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name = 'campaign_views';
  `))
  .then(res => {
    console.log("campaign_views columns:", res.rows);
  })
  .then(() => client.query(`
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name = 'subscribers';
  `))
  .then(res => {
    console.log("subscribers columns:", res.rows);
  })
  .then(() => client.query(`
    SELECT s.email, s.name, cv.created_at as viewed_at
    FROM campaign_views cv
    JOIN subscribers s ON cv.subscriber_id = s.id
    WHERE cv.campaign_id = 139
    ORDER BY cv.created_at DESC;
  `))
  .then(res => {
    console.log("\nOpens count for campaign 139:", res.rows.length);
    console.log("\nSome Opens:", res.rows.slice(0, 10));
  })
  .catch(err => console.error(err))
  .finally(() => client.end());
