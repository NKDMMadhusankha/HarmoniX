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
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #111827; background-image: linear-gradient(135deg, #111827 0%, #1E3A8A 100%); color: #ffffff; padding: 25px; text-align: center; border-bottom: 3px solid #3B82F6;">
            <h1 style="margin: 0; font-size: 28px; font-weight: 600; letter-spacing: 0.5px; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">New Message from HarmoniX</h1>
          </div>
          <div style="padding: 30px; background-color: #fafafa;">
            <p style="font-size: 17px; color: #4B5563; margin-bottom: 20px; font-weight: 500;">You've received a message from:</p>
            <div style="background-color: #EFF6FF; border-left: 4px solid #3B82F6; padding: 16px; margin-bottom: 25px; border-radius: 0 8px 8px 0; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
              <p style="margin: 0; font-weight: 600; color: #111827; font-size: 18px;">${name}</p>
              <p style="margin: 8px 0 0; color: #4B5563; font-size: 15px;"><span style="color: #3B82F6;">✉</span> ${email}</p>
            </div>
            <div style="background-color: #ffffff; border-radius: 12px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); border: 1px solid rgba(0,0,0,0.05);">
              <h2 style="font-size: 19px; color: #3B82F6; margin-top: 0; margin-bottom: 16px; border-bottom: 1px solid #E5E7EB; padding-bottom: 8px;">Message Content</h2>
              <p style="white-space: pre-wrap; color: #374151; line-height: 1.6; font-size: 16px;">${message}</p>
            </div>
            <div style="margin-top: 25px; text-align: center;">
              <p style="color: #6B7280; font-size: 14px; margin-bottom: 0;">Need help? Contact our support team</p>
              <a href="mailto:support@harmonix.com" style="color: #3B82F6; text-decoration: none; font-weight: 500;">support@harmonix.com</a>
            </div>
          </div>
          <div style="background-color: #111827; background-image: linear-gradient(135deg, #111827 0%, #1E3A8A 100%); color: #ffffff; text-align: center; padding: 20px; font-size: 14px;">
            <p style="margin: 0; font-weight: 500;">© ${new Date().getFullYear()} HarmoniX</p>
            <p style="margin: 5px 0 0; font-size: 13px; color: #9CA3AF;">Connect with music professionals worldwide</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    console.error('Email send error:', err);
    res.status(500).json({ success: false, message: 'Failed to send message.' });
  }
});

module.exports = router;
