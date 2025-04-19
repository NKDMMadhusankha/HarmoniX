const Musician = require('../models/Musician');
const { v4: uuidv4 } = require('uuid');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

// Initialize S3 client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  apiVersion: '2006-03-01',
  signatureVersion: 'v4'
});

// Upload file to S3
const uploadFileToS3 = async (file) => {
  // Validate AWS credentials first
  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    throw new Error('AWS credentials are not configured');
  }

  console.log('AWS Config:', {
    region: process.env.AWS_REGION,
    bucket: process.env.AWS_BUCKET_NAME,
    key: process.env.AWS_ACCESS_KEY_ID ? 'exists' : 'missing'
  });

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `profile-images/${Date.now()}_${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read',
  };

  try {
    console.log('Uploading with params:', { 
      ...params, 
      Body: `[Buffer of ${file.size} bytes]` 
    });
    
    const command = new PutObjectCommand(params);
    const data = await s3.send(command);
    
    console.log('S3 Upload Success:', data);
    return `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
  } catch (error) {
    console.error('Full S3 Error:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      metadata: error.$metadata
    });
    throw error;
  }
};

// Get musician profile
const getProfile = async (req, res) => {
  try {
    const musician = await Musician.findById(req.user.id).select('-password');
    if (!musician) {
      return res.status(404).json({ success: false, message: 'Musician not found' });
    }
    res.json({ success: true, musician });
  } catch (error) {
    console.error('Error fetching musician profile:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update basic profile info
const updateProfile = async (req, res) => {
  try {
    const { fullName, country, role, genres, about } = req.body;
    
    const updatedMusician = await Musician.findByIdAndUpdate(
      req.user.id,
      { 
        fullName, 
        country, 
        role, 
        genres,
        about
      },
      { new: true }
    ).select('-password');

    res.json({ 
      success: true, 
      message: 'Profile updated successfully',
      musician: updatedMusician
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update portfolio links
const updatePortfolioLinks = async (req, res) => {
  try {
    const { portfolioLinks } = req.body;
    
    const updatedMusician = await Musician.findByIdAndUpdate(
      req.user.id,
      { portfolioLinks },
      { new: true }
    ).select('-password');

    res.json({ 
      success: true, 
      message: 'Portfolio links updated successfully',
      musician: updatedMusician
    });
  } catch (error) {
    console.error('Error updating portfolio links:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Upload profile image
const uploadProfileImage = async (req, res) => {
  try {
    console.log("1. Request received with file:", req.file ? "Yes" : "No");
    
    if (!req.file) {
      console.log("Error: No file uploaded");
      return res.status(400).json({ 
        success: false, 
        message: 'No file uploaded' 
      });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid file type. Only JPEG, JPG and PNG are allowed'
      });
    }

    console.log("2. File details:", {
      name: req.file.originalname,
      size: req.file.size,
      type: req.file.mimetype
    });

    console.log("3. Attempting S3 upload...");
    const s3Url = await uploadFileToS3(req.file);
    console.log("4. S3 upload successful. URL:", s3Url);

    console.log("5. Updating database...");
    const updatedMusician = await Musician.findByIdAndUpdate(
      req.user.id,
      { profileImage: s3Url },
      { new: true }
    ).select('-password');

    if (!updatedMusician) {
      throw new Error('Musician not found');
    }

    console.log("6. Update complete");
    res.json({ 
      success: true, 
      imageUrl: s3Url,
      musician: updatedMusician
    });

  } catch (error) {
    console.error("FULL ERROR TRACE:", {
      message: error.message,
      stack: error.stack,
      rawError: error
    });
    
    const isDev = process.env.NODE_ENV === 'development';
    res.status(500).json({ 
      success: false,
      message: isDev ? error.message : 'Image upload failed',
      ...(isDev && { stack: error.stack }),
      errorCode: error.code || 'UNKNOWN_ERROR'
    });
  }
};

// Upload cover image
const uploadCoverImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const result = await uploadFileToS3(req.file);
    
    const updatedMusician = await Musician.findByIdAndUpdate(
      req.user.id,
      { coverImage: result },
      { new: true }
    ).select('-password');

    res.json({ 
      success: true, 
      message: 'Cover image uploaded successfully',
      imageUrl: result,
      musician: updatedMusician
    });
  } catch (error) {
    console.error('Error uploading cover image:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Add track
const addTrack = async (req, res) => {
  try {
    const { title, duration } = req.body;
    let audioUrl = null;

    if (req.file) {
      const result = await uploadFileToS3(req.file);
      audioUrl = result;
    }

    const musician = await Musician.findById(req.user.id).select('-password');
    
    const newTrack = {
      title,
      duration,
      audioUrl,
      uploadDate: new Date()
    };

    musician.tracks.push(newTrack);
    await musician.save();

    res.json({ 
      success: true, 
      message: 'Track added successfully',
      track: newTrack,
      musician
    });
  } catch (error) {
    console.error('Error adding track:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Add gallery image
const addGalleryImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const result = await uploadFileToS3(req.file);
    
    const musician = await Musician.findById(req.user.id).select('-password');
    musician.galleryImages.push(result);
    await musician.save();

    res.json({ 
      success: true, 
      message: 'Gallery image added successfully',
      imageUrl: result,
      musician
    });
  } catch (error) {
    console.error('Error adding gallery image:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  updatePortfolioLinks,
  uploadProfileImage,
  uploadCoverImage,
  addTrack,
  addGalleryImage
};