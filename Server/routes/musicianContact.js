// routes/musicianContact.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Musician = require('../models/Musician');

// POST /api/musician/contact
router.post('/', async (req, res) => {
  const { musicianId, name, email, message } = req.body;

  if (!musicianId || !name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  try {
    // Allow sending to Lyricists and Mixing Engineers
    const musician = await Musician.findById(musicianId);
    if (!musician || !['Lyricist', 'Mixing Engineer'].includes(musician.role)) {
      return res.status(404).json({ success: false, message: 'Musician not found.' });
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
      to: musician.email, // Send to Lyricist's personal email
      subject: `New message from HarmoniX user`,
      text: `You have received a new message from ${name} (${email}):\n\n${message}`,
      html: `<p>You have received a new message from <b>${name}</b> (${email}):</p><p>${message}</p>`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    console.error('Email send error:', err);
    res.status(500).json({ success: false, message: 'Failed to send message.' });
  }
});

module.exports = router;
