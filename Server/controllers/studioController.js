// controllers/studioController.js
const Studio = require('../models/Studio');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { uploadToS3 } = require('../utils/studioUpload');
const { generateSignedUrl } = require('../utils/s3');
const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');

exports.registerStudio = async (req, res) => {
try {
const { studioName, email, password, confirmPassword, phoneNumber, country } = req.body;

// Validation
if (password !== confirmPassword) {
return res.status(400).json({ message: 'Passwords do not match' });
}

const existingStudio = await Studio.findOne({ $or: [{ email }, { studioName }] });
if (existingStudio) {
return res.status(400).json({ message: 'Studio already exists' });
}

// Create new studio
const newStudio = new Studio(req.body);

// Add a flag to indicate that the studio user has not uploaded images yet
newStudio.hasUploadedImages = false;

await newStudio.save();

// Generate tokens
const accessToken = jwt.sign(
{ id: newStudio._id, role: 'studio' },
process.env.JWT_SECRET,
{ expiresIn: '1h' }
);

const refreshToken = jwt.sign(
{ id: newStudio._id },
process.env.JWT_REFRESH_SECRET,
{ expiresIn: '7d' }
);

// Save refresh token
newStudio.refreshToken = refreshToken;
await newStudio.save();

res.status(201).json({
success: true,
accessToken,
refreshToken,
studio: {
id: newStudio._id,
studioName: newStudio.studioName,
email: newStudio.email
}
});

} catch (error) {
console.error('Registration error:', error);
res.status(500).json({
success: false,
message: 'Server error during registration'
});
}
};

exports.loginStudio = async (req, res) => {
try {
const { email, password } = req.body;
const studio = await Studio.findOne({ email });
if (!studio) {
return res.status(401).json({ message: 'Invalid email or password' });
}
const isMatch = await bcrypt.compare(password, studio.password);
if (!isMatch) {
return res.status(401).json({ message: 'Invalid email or password' });
}

// Generate tokens
const accessToken = jwt.sign(
{ id: studio._id, role: 'studio' },
process.env.JWT_SECRET,
{ expiresIn: '1h' }
);
const refreshToken = jwt.sign(
{ id: studio._id },
process.env.JWT_REFRESH_SECRET,
{ expiresIn: '7d' }
);
studio.refreshToken = refreshToken;
await studio.save();

res.json({
success: true,
token: accessToken,
refreshToken,
studio: {
id: studio._id,
studioName: studio.studioName,
email: studio.email,
// add more fields as needed
}
});
} catch (err) {
res.status(500).json({ message: 'Server error during login' });
}
};

exports.updateStudioProfile = async (req, res) => {
  try {
    // Expanded allowed fields to match frontend
    const allowedUpdates = [
      'studioName', 'address', 'country', 'studioDescription', 'services', 'features',
      'recordingBooths', 'loungeArea', 'socialMedia', 'hourlyRate', 'minimumDuration',
      'city', 'postalCode', 'bookingSettings'
    ];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    if (!isValidOperation) {
      return res.status(400).json({ message: 'Invalid updates!' });
    }

    // Map frontend field names to backend schema if needed
    const updateData = { ...req.body };
    if (updateData.name) {
      updateData.studioName = updateData.name;
      delete updateData.name;
    }
    if (updateData.description) {
      updateData.studioDescription = updateData.description;
      delete updateData.description;
    }
    if (updateData.minimumDuration) {
      updateData['bookingSettings.minimumDuration'] = updateData.minimumDuration;
      delete updateData.minimumDuration;
    }
    if (updateData.hourlyRate) {
      updateData['bookingSettings.hourlyRate'] = updateData.hourlyRate;
      // Optionally keep hourlyRate at root for backward compatibility
    }

    // Ensure features is always an array
    if (!Array.isArray(updateData.features)) {
      updateData.features = Array.isArray(req.body.features)
        ? req.body.features
        : (typeof req.body.features === 'string' && req.body.features ? [req.body.features] : []);
    }

    // Clean up socialMedia: add facebook, remove linkedin
    if (updateData.socialMedia) {
      if (updateData.socialMedia.linkedin !== undefined) {
        delete updateData.socialMedia.linkedin;
      }
      // Ensure facebook is present if sent from frontend
      if (!('facebook' in updateData.socialMedia) && req.body.socialMedia.facebook) {
        updateData.socialMedia.facebook = req.body.socialMedia.facebook;
      }
    }

    const studio = await Studio.findByIdAndUpdate(
      req.user.id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password -refreshToken');

    res.json({ success: true, studio });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.uploadStudioImage = async (req, res) => {
  try {
    if (!req.file) {
      console.error('No file uploaded');
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const imageUrl = await uploadToS3(req.file, req.user.id);

    // Save image URL to the database
    const studio = await Studio.findByIdAndUpdate(
      req.user.id,
      { $push: { studioImages: imageUrl } },
      { new: true }
    );

    res.status(200).json({ success: true, imageUrl, studio });
  } catch (err) {
    console.error('Error uploading image:', err.message);
    res.status(500).json({ message: 'Error uploading image', error: err.message });
  }
};

exports.uploadStudioImages = async (req, res) => {
  try {
    if (!req.files || req.files.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please upload at least 6 images' 
      });
    }

    const uploadPromises = req.files.map(file => uploadToS3(file, req.user.id));
    const uploadedUrls = await Promise.all(uploadPromises);

    // Update the studio's images in the database
    const studio = await Studio.findByIdAndUpdate(
      req.user.id,
      { 
        $set: { 
          studioImages: uploadedUrls,
          hasUploadedImages: true 
        } 
      },
      { new: true }
    ).select('studioImages');

    // Generate presigned URLs for immediate display
    const signedImageUrls = await Promise.all(
      studio.studioImages.map(async (imageUrl) => {
        // Extract the key from the full URL
        const key = imageUrl.split('.com/')[1];
        return await generateSignedUrl(key);
      })
    );

    res.status(200).json({ 
      success: true, 
      studioImages: signedImageUrls 
    });
  } catch (err) {
    console.error('Error uploading studio images:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Error uploading studio images', 
      error: err.message 
    });
  }
};

exports.getStudioProfile = async (req, res) => {
  try {
    const studio = await Studio.findById(req.params.id).select('-password -refreshToken');
    if (!studio) return res.status(404).json({ message: 'Studio not found' });

    // Generate full URLs for studio images
    const imageUrls = studio.studioImages.map(key => {
      if (key.startsWith('http')) return key;
      return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    });

    res.status(200).json({
      success: true,
      studio: {
        ...studio.toObject(),
        studioImages: imageUrls
      }
    });
  } catch (err) {
    console.error('Error fetching studio profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get current studio profile for logged-in user
exports.getMyStudioProfile = async (req, res) => {
  try {
    const studio = await Studio.findById(req.user.id).select('-password -refreshToken');
    if (!studio) return res.status(404).json({ message: 'Studio not found' });

    // Generate full URLs for studio images
    const imageUrls = studio.studioImages.map(key => {
      if (key.startsWith('http')) return key;
      return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    });

    res.status(200).json({
      ...studio.toObject(),
      studioImages: imageUrls
    });
  } catch (err) {
    console.error('Error fetching my studio profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteStudioImage = async (req, res) => {
  try {
    const { key } = req.params;

    
    // Configure S3 client with proper permissions
    const s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      }
    });

    await s3.send(new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key
    }));

    // Remove from database
    await Studio.findByIdAndUpdate(
      req.user.id,
      { $pull: { studioImages: { $regex: key } } },
      { new: true }
    );

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ success: false, message: 'Error deleting image' });
  }
};

// Controller function to fetch studio images by ID
exports.getStudioImagesById = async (req, res) => {
  try {
    const { id } = req.params;
    const studio = await Studio.findById(id).select('studioImages');

    if (!studio) {
      return res.status(404).json({ success: false, message: 'Studio not found' });
    }

    res.json({ success: true, studioImages: studio.studioImages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.addStudioGear = async (req, res) => {
  try {
    const { category, items } = req.body;

    if (!category || !items || !Array.isArray(items)) {
      return res.status(400).json({ success: false, message: 'Invalid data. Category and items are required.' });
    }

    const studio = await Studio.findById(req.user.id);
    if (!studio) {
      return res.status(404).json({ success: false, message: 'Studio not found.' });
    }

    // Add new gear to the studioGear array
    studio.studioGear.push({ category, items });
    await studio.save();

    res.json({ success: true, message: 'Studio gear added successfully.', studioGear: studio.studioGear });
  } catch (error) {
    console.error('Error adding studio gear:', error);
    res.status(500).json({ success: false, message: 'Server error while adding studio gear.' });
  }
};