const { Client } = require('pg');

const DB_NAME = 'nosh-backend';

const DB_URL = process.env.DATABASE_URL


let client;

// github actions client config  <--- ???
if (process.env.CI) {
  client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'postgres',
  });
} else {
  client = new Client(DB_URL);
}

module.exports = client;