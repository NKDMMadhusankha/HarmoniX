const { v4: uuidv4 } = require('uuid'); // Import UUID library

const registerMusician = async (req, res) => {
  try {
    console.log('Received registration data:', req.body); // Log incoming data for debugging

    const { fullName, email, password, phoneNumber, country, role, experience, termsAgreed } = req.body;

    // Validate required fields
    if (!fullName || !email || !password || !phoneNumber || !country || !role || !experience || !termsAgreed) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }

    // Ensure userId is unique
    const userId = uuidv4();

    const newMusician = new Musician({
      userId,
      fullName,
      email,
      password,
      phoneNumber,
      country,
      role,
      experience,
      termsAgreed,
      ...req.body, // Include optional fields like genres, portfolioLinks, etc.
    });

    await newMusician.save();

    res.status(201).json({ message: 'Musician registered successfully', musician: newMusician });
  } catch (error) {
    console.error('Error during musician registration:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Duplicate entry detected', details: error.keyValue });
    }
    res.status(500).json({ message: 'Server error during registration' });
  }
};