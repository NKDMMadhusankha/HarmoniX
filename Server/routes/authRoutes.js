const express = require('express');
const { register, login, refreshToken } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Refresh Token route
router.post('/refresh-token', refreshToken);

// Example protected route
router.get('/protected', authMiddleware(['admin']), (req, res) => {
  res.json({ msg: 'This is a protected route' });
});

module.exports = router;
