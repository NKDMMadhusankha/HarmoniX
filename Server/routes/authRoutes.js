const express = require('express');
const { register, login, refreshToken, forgotPassword, resetPassword } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Refresh Token route
router.post('/refresh-token', refreshToken);

// Forgot Password
router.post('/forgot-password', forgotPassword);

// Reset Password
router.post('/reset-password/:token', resetPassword);

// Example protected route
router.get('/protected', authMiddleware(['admin']), (req, res) => {
  res.json({ msg: 'This is a protected route' });
});

module.exports = router;
