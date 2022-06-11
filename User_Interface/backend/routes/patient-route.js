const express = require('express');
const { login, register, changePassword } = require('../api/controllers/auth');

const router = express.Router();

router.post('/create', register);

router.get('/', login);

module.exports = router;
