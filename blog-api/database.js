const mysql = require('mysql');
const database = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'mugi123',
    database: 'blogsapp',
    port: '3306'
});

module.exports = database;