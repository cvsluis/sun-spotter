const pg = require('pg');

const client = new pg.Client({
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

client
  .connect()
  .catch(error => console.log(`Error connecting to database:\n${error}`))

module.exports = pool;