const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Musician = require('../models/Musician');

router.post('/', async (req, res) => {
  const { musicianId, name, email, message } = req.body;

  // Validate required fields
  if (!musicianId || !name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  try {
    // Find musician by ID and check role
    const musician = await Musician.findById(musicianId);
    if (!musician || !['Lyricist', 'Mixing Engineer', 'Mastering Engineer', 'Music Producer'].includes(musician.role)) {
      return res.status(404).json({ success: false, message: 'Musician not found.' });
    }

    // Check if the musician has a valid email
    if (!musician.email || typeof musician.email !== 'string' || musician.email.trim() === '') {
      return res.status(400).json({ success: false, message: 'Musician does not have a valid email address.' });
    }

    // Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Compose the email
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: musician.email,
      subject: `New message from HarmoniX users`,
      text: `You have received a new message from ${name} (${email}):\n\n${message}`,
      html: `<p>You have received a new message from <b>${name}</b> (${email}):</p><p>${message}</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    console.error('Email send error:', err);
    res.status(500).json({ success: false, message: 'Failed to send message.' });
  }
});

module.exports = router;
