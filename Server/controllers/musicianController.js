const Musician = require('../models/Musician');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Configure multer for audio file uploads
const audioStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'public/audio';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `audio-${Date.now()}${ext}`);
  }
});

const audioUpload = multer({
  storage: audioStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('audio/')) {
      cb(null, true);
    } else {
      cb(new AppError('Not an audio file! Please upload only audio files.', 400), false);
    }
  }
});

exports.uploadAudio = audioUpload.array('audioSamples', 5);

exports.resizeAudio = catchAsync(async (req, res, next) => {
  if (!req.files) return next();
  
  req.body.audioSamples = [];
  
  await Promise.all(
    req.files.map(async (file, i) => {
      const filename = `audio-${Date.now()}-${i + 1}.mp3`;
      const filepath = path.join('public', 'audio', filename);
      
      // For audio files, we might just move them (no resizing like images)
      await fs.promises.rename(file.path, filepath);
      
      req.body.audioSamples.push({
        url: `/audio/${filename}`,
        name: file.originalname
      });
    })
  );
  
  next();
});

exports.registerMusician = catchAsync(async (req, res, next) => {
  const {
    fullName,
    phoneNumber,
    email,
    password,
    confirmPassword,
    country,
    role,
    genres,
    experience,
    socialMedia,
    portfolioLinks,
    termsAgreed
  } = req.body;
  
  // 1) Check if passwords match
  if (password !== confirmPassword) {
    return next(new AppError('Passwords do not match', 400));
  }
  
  // 2) Create musician
  const newMusician = await Musician.create({
    fullName,
    phoneNumber,
    email,
    password,
    country,
    role,
    genres: role === 'Music Producer' ? genres : undefined,
    experience,
    socialMedia,
    portfolioLinks,
    audioSamples: req.body.audioSamples || [],
    termsAgreed
  });
  
  // 3) Remove password from output
  newMusician.password = undefined;
  
  // 4) Send response
  res.status(201).json({
    status: 'success',
    data: {
      musician: newMusician
    }
  });
});

exports.getAllMusicians = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Musician.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  
  const musicians = await features.query;
  
  res.status(200).json({
    status: 'success',
    results: musicians.length,
    data: {
      musicians
    }
  });
});

exports.getMusician = catchAsync(async (req, res, next) => {
  const musician = await Musician.findById(req.params.id);
  
  if (!musician) {
    return next(new AppError('No musician found with that ID', 404));
  }
  
  res.status(200).json({
    status: 'success',
    data: {
      musician
    }
  });
});

exports.updateMusician = catchAsync(async (req, res, next) => {
  // 1) Filter out unwanted fields that are not allowed to be updated
  const filteredBody = filterObj(
    req.body,
    'fullName',
    'phoneNumber',
    'email',
    'country',
    'role',
    'genres',
    'experience',
    'socialMedia',
    'portfolioLinks'
  );
  
  // 2) Update musician document
  const updatedMusician = await Musician.findByIdAndUpdate(
    req.params.id,
    filteredBody,
    {
      new: true,
      runValidators: true
    }
  );
  
  if (!updatedMusician) {
    return next(new AppError('No musician found with that ID', 404));
  }
  
  res.status(200).json({
    status: 'success',
    data: {
      musician: updatedMusician
    }
  });
});

exports.deleteMusician = catchAsync(async (req, res, next) => {
  const musician = await Musician.findByIdAndDelete(req.params.id);
  
  if (!musician) {
    return next(new AppError('No musician found with that ID', 404));
  }
  
  res.status(204).json({
    status: 'success',
    data: null
  });
});

function filterObj(obj, ...allowedFields) {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
}