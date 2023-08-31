const express = require('express');
const dotenv = require('dotenv').config();
var cors = require('cors');

const loginRouter = require('./Routes/loginRoutes.js');
const registerRouter = require('./Routes/registerRoutes.js');
const blogsRouter = require('./Routes/blogRoutes.js');

var app = express();

app.use(cors());
app.use(express.json());

const port = 3000;

app.listen(port, () => console.log(`app listening on port ${port}!`));

app.use("/login", loginRouter);
app.use("/register",registerRouter);
app.use("/blogs",blogsRouter);