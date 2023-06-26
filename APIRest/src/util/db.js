const postgres = require('postgres');

const connectionString = process.env.DB_URL;
const sql = postgres(connectionString);

module.exports = sql;