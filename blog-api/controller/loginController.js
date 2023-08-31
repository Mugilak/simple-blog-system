const database = require('../database.js');
const generateAccessToken = require('../generateToken.js');
const encrypt = require('bcrypt');

const login = (req, res) => {
    const user = req.body.username;
    const password = req.body.password;
    database.getConnection(async (err, connection) => {
        if (err) throw err;
        else {
            console.log("connected");
            let sql = `SELECT * FROM blogsapp.users WHERE username = "${user}"`;
            connection.query(sql, (err, result) => {
                if (err) throw err;
                try {
                    connection.release();
                    if (result.length == 0) {
                        res.status(201).json('username'); //204
                    } else {
                        if (encrypt.compare(password, result[0].password)) {
                            console.log("login success");
                            let token = generateAccessToken({ user: user });
                            res.status(200).json(token);
                        } else {
                            res.status(201).json('password');
                        }
                    }
                } catch (err) { console.log(err); }
            });
        }
    });
};

module.exports = { login };