const pg = require('pg');

const { Client } = pg;

const localClientConfig = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: 'localhost',
  port: '5432',
  database: 'quizs',

};

const clientConfig = process.PG_URL ? {
  connectionString: process.env.PG_URL,
  ssl: { rejectUnauthaurized: false },
} : localClientConfig;

const client = new Client();

client.connect();

module.exports = client;
