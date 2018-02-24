const mysql = require('mysql');
const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'bstek',
    database: 'db_test1'
});

module.exports = pool;