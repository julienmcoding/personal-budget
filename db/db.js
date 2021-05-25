const { Pool } = require('pg');
require('dotenv').config();

/*const devConfig = {
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
);*/
const isProduction = process.env.NODE_ENV === 'production';

const connectionString = 
`postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction,
});

module.exports = pool;