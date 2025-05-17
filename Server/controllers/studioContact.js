const nodemailer = require('nodemailer');
const Studio = require('../models/Studio');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

exports.sendBookingRequest = async (req, res) => {
  try {
    const { studioId, date, startTime, endTime, name, email, message } = req.body;
    const studio = await Studio.findById(studioId);
    if (!studio) return res.status(404).json({ success: false, message: 'Studio not found' });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: studio.email,
      subject: `New Booking Request for ${studio.studioName}`,
      html: `
        <h2>New Booking Request</h2>
        <p><strong>Customer Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${startTime} - ${endTime}</p>
        <p><strong>Special Requirements:</strong> ${message || 'None'}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Booking request sent to studio.' });
  } catch (err) {
    console.error('Error sending booking email:', err);
    res.status(500).json({ success: false, message: 'Failed to send booking request.' });
  }
};
