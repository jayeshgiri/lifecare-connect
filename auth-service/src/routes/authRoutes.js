const express = require('express');
const { login, signup } = require('../controllers/authController');

const router = express.Router();

// Auth routes
router.post('/login', login);
router.post('/signup', signup);

module.exports = router;