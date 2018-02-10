const mysql = require('mysql');
// var pool = mysql.createPool({
//     host     : 'localhost',
//     user     : 'root',
//     password : 'bstek',
//     database : 'dbtest'
// });
const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'bstek',
    database: 'db_test1'
});

module.exports = pool;