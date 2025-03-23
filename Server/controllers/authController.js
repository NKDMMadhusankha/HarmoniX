const User = require('../models/User'); // Import the User model
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Import jwt for token generation

const register = async (req, res) => {
  try {
    console.log('Register endpoint hit'); // Add logging
    const { fullName, email, password, confirmPassword } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword, // Save the hashed password
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ success: true, message: 'Registration successful!' });
  } catch (error) {
    console.error('Error during registration:', error); // Add logging
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Add login functionality
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

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { register, login };
