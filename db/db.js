const { Pool } = require('pg');
require('dotenv').config();

const devConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE
};

const proConfig = {
  connectionString: process.env.DATABASE_URL
};

const pool = new Pool(
  process.env.NODE_ENV === 'production' ? proConfig : devConfig
);

module.exports = pool;