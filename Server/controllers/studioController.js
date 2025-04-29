// controllers/studioController.js
const Studio = require('../models/Studio');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.registerStudio = async (req, res) => {
  try {
    const { studioName, email, password, confirmPassword, phoneNumber, country } = req.body;
    
    // Validation
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const existingStudio = await Studio.findOne({ $or: [{ email }, { studioName }] });
    if (existingStudio) {
      return res.status(400).json({ message: 'Studio already exists' });
    }

    // Create new studio
    const newStudio = new Studio(req.body);
    await newStudio.save();

    // Generate tokens
    const accessToken = jwt.sign(
      { id: newStudio._id, role: 'studio' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const refreshToken = jwt.sign(
      { id: newStudio._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    // Save refresh token
    newStudio.refreshToken = refreshToken;
    await newStudio.save();

    res.status(201).json({
      success: true,
      accessToken,
      refreshToken,
      studio: {
        id: newStudio._id,
        studioName: newStudio.studioName,
        email: newStudio.email
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error during registration'
    });
  }
};
