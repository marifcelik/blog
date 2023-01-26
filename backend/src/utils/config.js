const path = require('path');

require('dotenv').config({ path: path.resolve(`${__dirname}/../../`, `${process.env.NODE_ENV}.env`), debug: true });

module.exports = {
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || 3020,
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: process.env.DB_PORT || 5432,
    DB_NAME: process.env.DB_NAME || 'blog',
    DB_USERNAME: process.env.DB_USERNAME || 'postgres',
    DB_PASSWORD: process.env.DB_PASSWORD || 'password'
}