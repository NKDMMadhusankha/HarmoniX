const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const studioSchema = new mongoose.Schema({
  studioName: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  },
  hourlyRate: {
    type: Number,
    required: true
  },
  studioDescription: String,
  socialMedia: {
    instagram: String,
    twitter: String,
    linkedin: String,
    website: String
  },
  termsAgreed: {
    type: Boolean,
    default: false
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  refreshToken: String
});

// Hash password before saving
studioSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('Studio', studioSchema);
