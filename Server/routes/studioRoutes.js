// routes/studioRoutes.js
const express = require('express');
const router = express.Router();
const studioController = require('../controllers/studioController');

router.post('/register', studioController.registerStudio);

module.exports = router;
