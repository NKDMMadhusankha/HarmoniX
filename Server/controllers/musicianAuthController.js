const Musician = require('../models/Musician');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid'); // Import UUID library

const register = async (req, res) => {
  try {
    const { 
      fullName, 
      email, 
      password, 
      confirmPassword,
      phoneNumber,
      country,
      role,
      genres,
      experience,
      portfolioLinks,
      socialMedia,
      termsAgreed
    } = req.body;

    // Check if musician exists
    if (await Musician.findOne({ email })) {
      return res.status(400).json({ success: false, message: 'Musician already exists' });
    }

    // Password validation
    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    // Role-specific validation
    if (role === 'Music Producer' && (!genres || genres.length < 2)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Music Producers must select at least 2 genres' 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Generate a unique userId
    const userId = uuidv4();

    const newMusician = new Musician({
      userId, // Assign the generated userId
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      country,
      role,
      genres,
      experience,
      portfolioLinks,
      socialMedia,
      termsAgreed
    });

    await newMusician.save();
    
    // Create JWT token
    const token = jwt.sign({ 
      id: newMusician._id, 
      role: 'musician',
      userId: newMusician.userId // Include the userId in the token
    }, process.env.JWT_SECRET, { 
      expiresIn: '7d' 
    });

    res.status(201).json({ 
      success: true, 
      message: 'Musician registration successful!',
      token,
      musician: {
        userId: newMusician.userId, // Include userId in response
        id: newMusician._id,
        fullName: newMusician.fullName,
        email: newMusician.email,
        role: newMusician.role,
        // Include any other relevant fields
        genres: newMusician.genres,
        experience: newMusician.experience
      }
    });
  } catch (error) {
    console.error('Error during musician registration:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const musician = await Musician.findOne({ email });

    if (!musician || !(await bcrypt.compare(password, musician.password))) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: musician._id, role: 'musician' }, process.env.JWT_SECRET, { 
      expiresIn: '7d' 
    });

    res.json({ 
      token,
      musician: {
        id: musician._id,
        fullName: musician.fullName,
        email: musician.email,
        role: musician.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    
    const newToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({ token: newToken });
  } catch (error) {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
};

const getCurrentMusician = async (req, res) => {
  try {
    const musician = await Musician.findById(req.user.id).select('-password');
    if (!musician) {
      return res.status(404).json({ message: 'Musician not found' });
    }
    res.json(musician);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login, refreshToken, getCurrentMusician };