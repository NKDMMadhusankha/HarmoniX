const Musician = require('../models/Musician');
const { generateSignedUrl, s3, deleteFromS3 } = require('../utils/s3');

const getProfile = async (req, res) => {
  try {
    const musician = await Musician.findById(req.user.id);
    if (!musician) {
      return res.status(404).json({ success: false, message: 'Musician not found' });
    }

    // Convert to plain object to modify
    const musicianData = musician.toObject();

    // Generate signed URLs for images
    if (musicianData.profileImage) {
      musicianData.profileImage = await generateSignedUrl(musicianData.profileImage);
    }
    if (musicianData.coverImage) {
      musicianData.coverImage = await generateSignedUrl(musicianData.coverImage);
    }

    // Generate signed URLs for gallery images
    if (musicianData.galleryImages && musicianData.galleryImages.length > 0) {
      musicianData.galleryImages = await Promise.all(
        musicianData.galleryImages.map(async (image) => {
          return await generateSignedUrl(image);
        })
      );
      musicianData.galleryImageKeys = musician.galleryImages; // These are the S3 keys
    }

    // Generate signed URLs for track audio files
    if (musicianData.featuredTracks && musicianData.featuredTracks.length > 0) {
      musicianData.featuredTracks = await Promise.all(
        musicianData.featuredTracks.map(async (track) => {
          if (track.audioUrl) {
            return {
              ...track,
              audioUrl: await generateSignedUrl(track.audioUrl)
            };
          }
          return track;
        })
      );
    }

    res.json({ success: true, musician: musicianData });
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

    // Update portfolioLinks and socialMedia
    if (req.body.portfolioLinks) {
      musician.portfolioLinks = JSON.parse(req.body.portfolioLinks);
    }
    if (req.body.socialMedia) {
      musician.socialMedia = JSON.parse(req.body.socialMedia);
    }

    // Handle images and audio uploads
    if (req.files && req.files['avatar']) {
      musician.profileImage = req.files['avatar'][0].key; // Store the S3 key, not the full URL
    }
    if (req.files && req.files['coverImage']) {
      musician.coverImage = req.files['coverImage'][0].key; // Store the S3 key
    }
    if (req.files && req.files['gallery']) {
      const galleryKeys = req.files['gallery'].map(f => f.key);
      // Only add keys that are not already present
      musician.galleryImages = musician.galleryImages.concat(
        galleryKeys.filter(key => !musician.galleryImages.includes(key))
      );
    }
    if (req.files && req.files['track']) {
      const tracksMeta = JSON.parse(req.body.tracks || '[]');
      req.files['track'].forEach((file, idx) => {
        const meta = tracksMeta[idx] || {};
        musician.featuredTracks.push({
          title: meta.title || file.originalname,
          duration: meta.duration || '',
          uploadDate: new Date().toISOString(),
          audioUrl: file.key, // Store the S3 key
        });
      });
    }

    await musician.save();
    
    // Return the updated profile with signed URLs
    const updatedMusician = musician.toObject();
    
    if (updatedMusician.profileImage) {
      updatedMusician.profileImage = await generateSignedUrl(updatedMusician.profileImage);
    }
    if (updatedMusician.coverImage) {
      updatedMusician.coverImage = await generateSignedUrl(updatedMusician.coverImage);
    }
    if (updatedMusician.galleryImages && updatedMusician.galleryImages.length > 0) {
      updatedMusician.galleryImages = await Promise.all(
        updatedMusician.galleryImages.map(async (image) => {
          return await generateSignedUrl(image);
        })
      );
    }
    if (updatedMusician.featuredTracks && updatedMusician.featuredTracks.length > 0) {
      updatedMusician.featuredTracks = await Promise.all(
        updatedMusician.featuredTracks.map(async (track) => {
          if (track.audioUrl) {
            return {
              ...track,
              audioUrl: await generateSignedUrl(track.audioUrl)
            };
          }
          return track;
        })
      );
    }

    res.json({ success: true, musician: updatedMusician });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteGalleryImage = async (req, res) => {
  try {
    const userId = req.user.id;
    const imageKey = decodeURIComponent(req.params.imageKey);

    // Remove image from S3
    await s3.send(
      new (require('@aws-sdk/client-s3').DeleteObjectCommand)({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: imageKey,
      })
    );

    // Remove image reference from MongoDB
    const musician = await Musician.findById(userId);
    if (!musician) return res.status(404).json({ success: false, message: 'Musician not found' });

    musician.galleryImages = musician.galleryImages.filter(img => img !== imageKey);
    await musician.save();

    res.json({ success: true, message: 'Image deleted successfully', imageKey });
  } catch (err) {
    console.error('Delete gallery image error:', err);
    res.status(500).json({ success: false, message: 'Failed to delete image' });
  }
};

const deleteTrack = async (req, res) => {
  try {
    const userId = req.user.id;
    const trackIndex = parseInt(req.params.trackIndex, 10);

    const musician = await Musician.findById(userId);
    if (!musician) return res.status(404).json({ success: false, message: 'Musician not found' });

    if (trackIndex < 0 || trackIndex >= musician.featuredTracks.length) {
      return res.status(400).json({ success: false, message: 'Invalid track index' });
    }

    const track = musician.featuredTracks[trackIndex];
    if (track.audioUrl) {
      await deleteFromS3(track.audioUrl);
    }

    musician.featuredTracks.splice(trackIndex, 1);
    await musician.save();

    res.json({ success: true, message: 'Track deleted successfully' });
  } catch (err) {
    console.error('Delete track error:', err);
    res.status(500).json({ success: false, message: 'Failed to delete track' });
  }
};

const getAllProducers = async (req, res) => {
  try {
    // Only fetch users with role 'Music Producer'
    const producers = await Musician.find({ role: 'Music Producer' });

    // Map and generate signed URLs for profile images
    const producersData = await Promise.all(producers.map(async (producer) => {
      const obj = producer.toObject();
      if (obj.profileImage) {
        obj.profileImage = await generateSignedUrl(obj.profileImage);
      }
      // Only send needed fields
      return {
        id: obj._id,
        fullName: obj.fullName,
        country: obj.country,
        about: obj.about,
        profileImage: obj.profileImage,
      };
    }));

    res.json({ success: true, producers: producersData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getProducerProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const producer = await Musician.findById(id);
    if (!producer || producer.role !== 'Music Producer') {
      return res.status(404).json({ success: false, message: 'Producer not found' });
    }
    const obj = producer.toObject();

    // Generate signed URLs for images and tracks
    if (obj.profileImage) obj.profileImage = await generateSignedUrl(obj.profileImage);
    if (obj.coverImage) obj.coverImage = await generateSignedUrl(obj.coverImage);
    if (obj.galleryImages && obj.galleryImages.length > 0) {
      obj.galleryImages = await Promise.all(
        obj.galleryImages.map(async (image) => await generateSignedUrl(image))
      );
    }
    if (obj.featuredTracks && obj.featuredTracks.length > 0) {
      obj.featuredTracks = await Promise.all(
        obj.featuredTracks.map(async (track) => {
          if (track.audioUrl) {
            return { ...track, audioUrl: await generateSignedUrl(track.audioUrl) };
          }
          return track;
        })
      );
    }
    res.json({ success: true, producer: obj });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { 
  getProfile, 
  updateProfile, 
  deleteGalleryImage, 
  deleteTrack,
  getAllProducers,
  getProducerProfileById
};
