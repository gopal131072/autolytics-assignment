// External libraries
const promise = require('bluebird');
const initOptions = {
    promiseLib: promise
};
const pgp = require('pg-promise')(initOptions);

// Config for database
const cn = process.env.NODE_ENV == 'PRODUCTION' ? {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
} : {
    host: 'localhost',
    port: 5432,
    database: 'autolytics',
    user: 'postgres',
    password: 'postgres'
};

const db = pgp(cn);
console.log('Connected to database', process.env.NODE_ENV == 'PRODUCTION' ? process.env.DB_NAME : 'autolytics');

module.exports = db;
