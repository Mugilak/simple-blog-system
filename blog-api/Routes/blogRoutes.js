const express = require('express');
const router = express.Router();
const blogsController = require('../controller/blogsController.js');

router.get('/', blogsController.getBlogs);

router.get('/:author', blogsController.getBlogByAuthor);

module.exports = router;