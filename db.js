const mariadb = require('mariadb');
const log = require('./logger');

const db = mariadb.createPool({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBNAME,
    connectionLimit: 5
});

db.getConnection()
    .then(conn => {
        log.db('Connected to database');
        conn.release();
    })
    .catch(err => {
        log.db('Error connecting to database');
        log.error(err);
    });

module.exports = db;