const { Pool, types } = require('pg');
require('dotenv').config();

// PostgreSQL DATE values should stay as YYYY-MM-DD strings
types.setTypeParser(1082, value => value);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

module.exports = pool;