const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

// Define the register route
router.post('/register', register);

// Define the login route
router.post('/login', login);

module.exports = router;
