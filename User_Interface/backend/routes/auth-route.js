const express = require('express');
const { login, register, changePassword } = require('../api/controllers/auth');

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.put('/changePassword', changePassword);

module.exports = router;
