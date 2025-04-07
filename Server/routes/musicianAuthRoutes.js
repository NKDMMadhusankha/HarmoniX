const express = require('express');
const { register, login } = require('../controllers/musicianAuthController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Example protected route for musicians
router.get('/profile', authMiddleware(['musician']), (req, res) => {
  res.json({ msg: 'This is a protected musician route' });
});

module.exports = router;