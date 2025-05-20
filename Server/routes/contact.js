const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
  const { firstName, lastName, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  // Create HTML email template
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #111;
          background: #f4f6fb;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.10);
          overflow: hidden;
        }
        .header {
          background: linear-gradient(90deg, #111 0%, #2575fc 100%);
          color: #fff;
          padding: 32px 24px 20px 24px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 2rem;
          font-weight: 600;
          letter-spacing: 1px;
        }
        .content {
          padding: 32px 24px 24px 24px;
        }
        .info-row {
          margin-bottom: 18px;
          display: flex;
          align-items: center;
        }
        .label {
          font-weight: 600;
          width: 90px;
          color: #111;
          font-size: 15px;
        }
        .value {
          font-size: 16px;
          color: #2575fc;
        }
        .value a {
          color: #2575fc;
          text-decoration: none;
        }
        .message-title {
          margin: 28px 0 10px 0;
          font-size: 1.1rem;
          color: #111;
          font-weight: 600;
        }
        .message-box {
          background: #f7f9fc;
          padding: 18px 16px;
          border-radius: 8px;
          border-left: 4px solid #2575fc;
          font-size: 15px;
          color: #111;
          line-height: 1.7;
        }
        .footer {
          background: #f7f9fc;
          padding: 18px 24px;
          text-align: center;
          color: #2575fc;
          font-size: 13px;
          border-top: 1px solid #eaeaea;
        }
        .footer .brand {
          font-weight: bold;
          color: #111;
          letter-spacing: 1px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Contact Message</h1>
        </div>
        <div class="content">
          <div class="info-row">
            <span class="label">Name:</span>
            <span class="value">${firstName} ${lastName}</span>
          </div>
          <div class="info-row">
            <span class="label">Email:</span>
            <span class="value"><a href="mailto:${email}">${email}</a></span>
          </div>
          <div class="message-title">Message</div>
          <div class="message-box">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
        <div class="footer">
          <span class="brand">HarmoniX</span> &mdash; This message was sent from the HarmoniX contact form.
        </div>
      </div>
    </body>
    </html>
  `;

  // Improved plain text format
  const enhancedText = `
NEW CONTACT MESSAGE
===================

FROM: ${firstName} ${lastName}
EMAIL: ${email}

MESSAGE:
-----------------
${message}
-----------------

Sent via HarmoniX contact form.
  `.trim();

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER, // Sends to your own Gmail
    subject: `Contact from ${firstName} ${lastName}`,
    text: enhancedText,
    html: htmlContent
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send message.', error });
  }
});

module.exports = router;
