const mongoose = require('mongoose');

const MusicianSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  country: { type: String, required: true },
  role: { 
    type: String, 
    required: true,
    enum: ['Music Producer', 'Mixing Engineer', 'Mastering Engineer', 'Lyricist'] 
  },
  genres: { type: [String], default: [] },
  experience: { type: String, required: true },
  portfolioLinks: {
    spotify: { type: String, default: '' },
    soundcloud: { type: String, default: '' },
    youtube: { type: String, default: '' },
    appleMusic: { type: String, default: '' }
  },
  socialMedia: {
    instagram: { type: String, default: '' },
    twitter: { type: String, default: '' },
    linkedin: { type: String, default: '' }
  },
  termsAgreed: { type: Boolean, required: true },
  profileImage: { type: String, default: '' },
  coverImage: { type: String, default: '' },
  featuredTracks: [
    {
      title: { type: String },
      duration: { type: String },
      uploadDate: { type: String },
      audioUrl: { type: String }
    }
  ],
  galleryImages: [{ type: String }],
  // --- Add these fields for full frontend compatibility ---
  about: { type: String, default: '' },
  tags: { type: [String], default: [] },
  links: [
    {
      platform: { type: String },
      url: { type: String }
    }
  ],
  skills: { type: [String], default: [] },
  tools: { type: [String], default: [] }
}, { timestamps: true });

module.exports = mongoose.model('Musician', MusicianSchema);