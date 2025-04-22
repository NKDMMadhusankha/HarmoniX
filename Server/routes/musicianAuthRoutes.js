const express = require('express');
const { register, login, getCurrentMusician } = require('../controllers/musicianAuthController');
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

// Route to fetch the current musician's details
router.get('/current', authMiddleware(['musician']), getCurrentMusician);

module.exports = router;