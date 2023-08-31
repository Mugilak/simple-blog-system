const database = require('../database.js');

const getBlogs = (req, res) => {
    database.getConnection((err, connection) => {
        if (err) throw err;
        connection.query('SELECT * FROM blogsapp.blogs', (err, result) => {
            if (err) throw err;
            const answer = result;
            res.json(answer).status(200);
        });
    });
};

const getBlogByAuthor = (req, res) => {
    const author = req.params.author;
    database.getConnection((err, connection) => {
        if (err) throw err;
        const sql = 'SELECT * FROM blogsapp.blogs where author=?';
        connection.query(sql, author,(err, result) => {
            res.json(result);
        });
    });
};

module.exports = {
    getBlogByAuthor,
    getBlogs
};