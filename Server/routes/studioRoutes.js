// routes/studioRoutes.js
const express = require('express');
const router = express.Router();
const studioController = require('../controllers/studioController');
const Studio = require('../models/Studio');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const studioContact = require('../controllers/studioContact');

// Configure multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

router.post('/register', studioController.registerStudio);

router.post('/login', studioController.loginStudio);

// Get current studio profile (protected route)
router.get('/me', authMiddleware(['studio']), studioController.getMyStudioProfile);

// Update studio profile (use controller for validation and logic)
router.put('/update', authMiddleware(['studio']), studioController.updateStudioProfile);

// Handle image uploads
router.put('/images', authMiddleware(['studio']), async (req, res) => {
  try {
    const { images } = req.body;
    const studio = await Studio.findByIdAndUpdate(
      req.user.id,
      { $set: { studioImages: images } }, // Changed from $push to $set
      { new: true }
    ).select('studioImages');
    
    res.json({ success: true, studioImages: studio.studioImages });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Handle gear updates
router.put('/gear', authMiddleware(['studio']), async (req, res) => {
  try {
    const { operation, payload } = req.body;
    let update;

    switch (operation) {
      case 'addCategory':
        update = { $push: { studioGear: payload } };
        break;
      case 'removeCategory':
        update = { $pull: { studioGear: { _id: payload.categoryId } } };
        break;
      case 'addItem':
        update = { $push: { 'studioGear.$[category].items': payload.item } };
        break;
      case 'removeItem':
        update = { $pull: { 'studioGear.$[category].items': payload.item } };
        break;
      case 'bulkUpdate':
        update = { $set: { studioGear: payload } };
        break;
      default:
        return res.status(400).json({ success: false, message: 'Invalid operation' });
    }

    const studio = await Studio.findByIdAndUpdate(
      req.user.id,
      update,
      {
        new: true,
        arrayFilters: payload.arrayFilters || []
      }
    ).select('studioGear');

    res.json({ success: true, studioGear: studio.studioGear });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Add new studio gear
router.post('/gear', authMiddleware(['studio']), studioController.addStudioGear);

// Add this route for image uploads
router.post(
  '/upload',
  authMiddleware(['studio']),
  upload.single('image'),
  studioController.uploadStudioImage
);

// Add a route for bulk uploading studio images
router.post('/upload-images', authMiddleware(['studio']), upload.array('studioImages', 12), studioController.uploadStudioImages);

// Add a route for deleting studio images by key
router.delete('/images/:key', authMiddleware(['studio']), studioController.deleteStudioImage);

// Add a route to fetch all studios
router.get('/all', async (req, res) => {
  try {
    // Exclude sensitive fields
    const studios = await Studio.find({}, '-password -refreshToken');
    res.json({ success: true, studios });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Add routes for studio availability
router.get('/availability', authMiddleware(['studio']), studioController.getStudioAvailability);
router.put('/availability', authMiddleware(['studio']), studioController.updateStudioAvailability);

// Add a route to fetch a studio by ID, including the 'about' field
router.get('/:id', studioController.getStudioProfile);

// Add a route to fetch studio images by ID
router.get('/:id/images', studioController.getStudioImagesById);

// Public route to get availability for a specific studio by ID
router.get('/:id/availability', studioController.getStudioAvailabilityById);

// Send booking request email to studio
router.post('/book', studioContact.sendBookingRequest);

module.exports = router;