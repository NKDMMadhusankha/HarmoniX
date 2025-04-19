const express = require('express');
const router = express.Router();
const musicianProfileController = require('../controllers/musicianProfileController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Get musician profile
router.get('/profile', authMiddleware(['musician']), musicianProfileController.getProfile);

// Update basic profile info
router.put('/profile', authMiddleware(['musician']), musicianProfileController.updateProfile);

// Update portfolio links
router.put('/profile/links', authMiddleware(['musician']), musicianProfileController.updatePortfolioLinks);

// Upload profile image
router.post('/profile/image', authMiddleware(['musician']), upload.single('image'), musicianProfileController.uploadProfileImage);

// Upload cover image
router.post('/profile/cover', authMiddleware(['musician']), upload.single('image'), musicianProfileController.uploadCoverImage);

// Add track
router.post('/profile/tracks', authMiddleware(['musician']), upload.single('audio'), musicianProfileController.addTrack);

// Add gallery image
router.post('/profile/gallery', authMiddleware(['musician']), upload.single('image'), musicianProfileController.addGalleryImage);

module.exports = router;