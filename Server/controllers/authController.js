const User = require('../models/User');
const Studio = require('../models/Studio'); // Import Studio model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const register = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;

    if (await User.findOne({ email })) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ success: true, message: 'Registration successful!' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Check if the user is a studio and if studioImages is empty
    const studio = await Studio.findOne({ email });
    const isFirstTimeLogin = studio && studio.studioImages.length === 0;

    res.json({ token, user, isFirstTimeLogin });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

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

    const newAccessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(403).json({ msg: 'Invalid refresh token' });
  }
};

// Forgot Password
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'No account with that email found.' });
    }

    // Generate token
    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    // Send email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const resetUrl = `http://localhost:5173/reset-password/${token}`; // Adjust as per your frontend

    const mailOptions = {
      to: user.email,
      from: process.env.GMAIL_USER,
      subject: 'Password Reset Request',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.

Please click the link below to complete the process:
${resetUrl}

If you did not request this, please ignore this email.
      `,
      html: `
        <body style="margin:0; padding:0; background: #f6f8fc;">
          <table cellpadding="0" cellspacing="0" width="100%" style="background: #f6f8fc; min-height: 100vh;">
            <tr>
              <td>
                <table cellpadding="0" cellspacing="0" width="100%" style="max-width: 440px; margin: 48px auto; background: #fff; border-radius: 18px; box-shadow: 0 6px 32px rgba(25,118,210,0.10); overflow: hidden;">
                  <tr>
                    <td style="padding: 40px 36px 32px 36px; text-align: center;">
                      <!-- Logo (optional) -->
                      <img src="https://img.icons8.com/color/96/000000/musical-notes.png" width="56" height="56" alt="Harmonix" style="margin-bottom: 18px; border-radius: 12px;" />
                      <h2 style="font-family: 'Inter', 'Segoe UI', Arial, sans-serif; color: #222; margin-bottom: 10px; font-size: 26px; letter-spacing: -1px;">
                        Reset your password
                      </h2>
                      <p style="font-family: 'Inter', 'Segoe UI', Arial, sans-serif; color: #5f6c7b; font-size: 16px; margin-bottom: 32px; line-height: 1.6;">
                        We received a request to reset your password.<br>
                        Click the button below to create a new password for your account.
                      </p>
                      <a href="${resetUrl}"
                        style="display: inline-block; padding: 16px 36px; background: linear-gradient(90deg, #1976d2, #21cbf3); color: #fff; border-radius: 8px; font-weight: 600; text-decoration: none; font-size: 17px; letter-spacing: 0.5px; box-shadow: 0 2px 8px rgba(33,203,243,0.10); transition: background 0.3s;">
                        Reset Password
                      </a>
                      <p style="font-family: 'Inter', 'Segoe UI', Arial, sans-serif; color: #b0b8c1; font-size: 13px; margin-top: 36px; margin-bottom: 0;">
                        Didn’t request a password reset? You can safely ignore this email.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="background: #f6f8fc; text-align: center; padding: 18px 0 6px 0; font-size: 12px; color: #b0b8c1; font-family: 'Inter', 'Segoe UI', Arial, sans-serif;">
                      &copy; ${new Date().getFullYear()} Harmonix. All rights reserved.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'Password reset link sent to your email.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ message: 'Password has been reset successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login, refreshToken, forgotPassword, resetPassword };
