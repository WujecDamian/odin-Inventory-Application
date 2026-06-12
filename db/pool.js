// db/pool.js
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DB_EXT,
  ssl: { rejectUnauthorized: false },
});

module.exports = pool;
