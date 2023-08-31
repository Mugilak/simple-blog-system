const database = require('../database.js');
const encrypt = require('bcrypt');

const saltRounds = 10;

const register = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let count = 0;
    database.getConnection((err, connection) => {
        if (err) throw err;
        connection.query('SELECT * FROM users WHERE username = ?', username, async (err, result) => {
            if (err) throw err;
            if (result.length == 0) {
                console.log("2");
                connection.query('SELECT COUNT(*) AS count FROM users;', async (err, result) => {
                    if (err) throw err;
                    count = (result[0].count) + 1;
                });
                hashed = await encrypt.hash(password, saltRounds);
                data = { 'id': count, 'username': username, 'password': hashed, 'email': email };
                console.log(data);
                connection.query('INSERT INTO users VALUES (?,?,?,?);', [count, username, hashed, email], async (err) => {
                    if (err) throw err;
                    connection.release();
                    try {
                        res.status(201).json('successfully registered!')
                    } catch (err) { console.log(err); }
                });
            }
            else {
                res.status(204).json("Username already exist");
            }
        });
    });
}

module.exports = { register };