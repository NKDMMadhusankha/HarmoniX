const Musician = require('../models/Musician');

const getProfile = async (req, res) => {
  try {
    const musician = await Musician.findById(req.user.id);
    if (!musician) {
      return res.status(404).json({ success: false, message: 'Musician not found' });
    }
    res.json({ success: true, musician });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // from JWT

    // Find the musician
    const musician = await Musician.findById(userId);
    if (!musician) return res.status(404).json({ message: 'Musician not found' });

    // Update fields
    if (req.body.name) musician.fullName = req.body.name;
    if (req.body.country) musician.country = req.body.country;
    if (req.body.about) musician.about = req.body.about;
    if (req.body.tags) musician.tags = JSON.parse(req.body.tags);
    if (req.body.links) musician.links = JSON.parse(req.body.links);
    if (req.body.genres) musician.genres = JSON.parse(req.body.genres);
    if (req.body.skills) musician.skills = JSON.parse(req.body.skills);
    if (req.body.tools) musician.tools = JSON.parse(req.body.tools);
    if (req.body.tracks) musician.tracks = JSON.parse(req.body.tracks);

    // Handle images and audio uploads
    if (req.files && req.files['avatar']) {
      musician.profileImage = req.files['avatar'][0].location;
    }
    if (req.files && req.files['coverImage']) {
      musician.coverImage = req.files['coverImage'][0].location;
    }
    if (req.files && req.files['gallery']) {
      const galleryUrls = req.files['gallery'].map(f => f.location);
      musician.galleryImages = musician.galleryImages.concat(galleryUrls);
    }
    if (req.files && req.files['track']) {
      // Expect track info in req.body.tracks as JSON stringified array
      const tracksMeta = JSON.parse(req.body.tracks || '[]');
      req.files['track'].forEach((file, idx) => {
        const meta = tracksMeta[idx] || {};
        musician.featuredTracks.push({
          title: meta.title || file.originalname,
          duration: meta.duration || '',
          uploadDate: new Date().toISOString(),
          audioUrl: file.location,
        });
      });
    }

    await musician.save();
    res.json({ success: true, musician });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getProfile, updateProfile };
