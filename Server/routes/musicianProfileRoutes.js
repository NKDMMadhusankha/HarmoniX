// routes/musicianProfileRoutes.js
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../utils/upload');
const { updateProfile } = require('../controllers/musicianProfileController');
const { getProfile } = require('../controllers/musicianProfileController');

const router = express.Router();

router.put(
  '/profile',
  authMiddleware(['musician']),
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 },
    { name: 'gallery', maxCount: 10 },
    { name: 'track', maxCount: 10 },
  ]),
  updateProfile
);

// GET /api/musician/profile
router.get('/profiles', authMiddleware(['musician']), getProfile);

module.exports = router;
