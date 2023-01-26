const postgres = require('postgres');
const { DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD } = require('../config');

const sql = postgres({
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME,
    username: DB_USERNAME,
    password: DB_PASSWORD
})

module.exports = sql