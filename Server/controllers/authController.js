const User = require('../models/User'); // Import the User model

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

    // Create new user
    const newUser = new User({
      fullName,
      email,
      password, // Note: You should hash the password before saving
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ success: true, message: 'Registration successful!' });
  } catch (error) {
    console.error('Error during registration:', error); // Add logging
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { register };
