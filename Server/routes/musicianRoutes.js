const express = require('express');
const musicianController = require('../controllers/musicianController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post(
  '/register',
  musicianController.uploadAudio,
  musicianController.resizeAudio,
  musicianController.registerMusician
);

// Protect all routes after this middleware
router.use(authController.protect);

router.get('/', musicianController.getAllMusicians);
router.get('/:id', musicianController.getMusician);

// Restrict to admin for the following routes
router.use(authController.restrictTo('admin'));

router
  .route('/:id')
  .patch(musicianController.updateMusician)
  .delete(musicianController.deleteMusician);

module.exports = router;