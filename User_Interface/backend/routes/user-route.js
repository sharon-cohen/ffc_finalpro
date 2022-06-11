const express = require('express');
const { newPassword } = require('../api/controllers/users');

const router = express.Router();

router.post('/new-password', newPassword);

module.exports = router;
