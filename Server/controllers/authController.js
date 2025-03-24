const User = require('../models/User'); 
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 

const register = async (req, res) => {
  try {
    console.log('Register endpoint hit'); 
    const { fullName, email, password, confirmPassword } = req.body;
    
    console.log('Received data:', { fullName, email, password, confirmPassword });

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists');
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      console.log('Passwords do not match');
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed successfully');

    // Create new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    // Save user to database
    await newUser.save();
    console.log('User saved successfully');

    res.status(201).json({ success: true, message: 'Registration successful!' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Login with JWT and Refresh Tokens
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Compare entered password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token (store user ID in token payload)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the token in the response
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Refresh token
const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ msg: 'No refresh token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ msg: 'Invalid refresh token' });
    }

    const newAccessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(403).json({ msg: 'Invalid refresh token' });
  }
};

module.exports = { register, login, refreshToken };
