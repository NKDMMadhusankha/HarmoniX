// routes/musicianProfileRoutes.js
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../utils/upload');
const { 
  updateProfile, 
  getProfile, 
  deleteGalleryImage, 
  deleteTrack, 
  getAllProducers, 
  getProducerProfileById, 
  getAllMixingEngineers, 
  getMixingEngineerProfileById,
  getAllMasteringEngineers,
  getMasteringEngineerProfileById,
  getAllLyricists,
  getLyricistProfileById
} = require('../controllers/musicianProfileController');

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

router.delete(
  '/gallery/:imageKey',
  authMiddleware(['musician']),
  deleteGalleryImage
);

router.delete(
  '/track/:trackIndex',
  authMiddleware(['musician']),
  deleteTrack
);

// Public route: Get all producers (no auth required for listing)
router.get('/producers', getAllProducers);

// Public route: Get a single producer by ID
router.get('/producers/:id', getProducerProfileById);

// Public route: Get all mixing engineers (no auth required for listing)
router.get('/mixing-engineers', getAllMixingEngineers);

// Public route: Get a single mixing engineer by ID
router.get('/mixing-engineers/:id', getMixingEngineerProfileById);

// Public route: Get all mastering engineers (no auth required for listing)
router.get('/mastering-engineers', getAllMasteringEngineers);

// Public route: Get a single mastering engineer by ID
router.get('/mastering-engineers/:id', getMasteringEngineerProfileById);

// Public route: Get all lyricists (no auth required for listing)
router.get('/lyricists', getAllLyricists);

// Public route: Get a single lyricist by ID
router.get('/lyricists/:id', getLyricistProfileById);

module.exports = router;
