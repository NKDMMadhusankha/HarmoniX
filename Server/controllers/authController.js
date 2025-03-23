// authController.js
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Path to your User model

// Register controller
const register = async (req, res) => {
  const { fullName, email, password, confirmPassword } = req.body;

  try {
    // Validate if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match!" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered!" });
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    // Save user to the database
    await newUser.save();

    res.status(201).json({ success: true, message: 'User registered successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error. Please try again." });
  }
};

module.exports = { register };
