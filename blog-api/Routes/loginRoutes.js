const express = require('express');
const router = express.Router();

const loginControl = require('../controller/loginController.js');

router.post("/", loginControl.login);

module.exports = router;