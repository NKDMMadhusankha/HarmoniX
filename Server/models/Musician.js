const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const musicianSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 8,
    select: false
  },
  country: {
    type: String,
    required: [true, 'Country is required']
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    enum: ['Music Producer', 'Mixing Engineer', 'Mastering Engineer', 'Lyricist']
  },
  genres: {
    type: [String],
    validate: {
      validator: function(genres) {
        // Only require genres for Music Producers
        if (this.role === 'Music Producer') {
          return genres && genres.length >= 2;
        }
        return true;
      },
      message: 'Music Producers must select at least 2 genres'
    }
  },
  audioSamples: [{
    url: String,
    name: String
  }],
  portfolioLinks: {
    spotify: String,
    soundcloud: String,
    youtube: String,
    appleMusic: String
  },
  experience: {
    type: String,
    required: [true, 'Experience level is required'],
    enum: ['1-2 years', '3-5 years', '6+ years']
  },
  socialMedia: {
    instagram: String,
    twitter: String,
    linkedin: String
  },
  termsAgreed: {
    type: Boolean,
    required: [true, 'You must agree to the terms'],
    validate: {
      validator: function(value) {
        return value === true;
      },
      message: 'You must agree to the terms'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
musicianSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Update timestamp on update
musicianSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: Date.now() });
  next();
});

// Method to compare passwords
musicianSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const Musician = mongoose.model('Musician', musicianSchema);

module.exports = Musician;