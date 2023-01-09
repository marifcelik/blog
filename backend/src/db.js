const postgres = require('postgres');

const sql = postgres({
    host: 'localhost',
    port: 5432,
    database: 'blog',
    username: 'postgres',
    password: 'sifre25'
})

module.exports = sql