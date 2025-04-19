const multer = require('multer');
const path = require('path');

// Set up storage for uploaded files
const storage = multer.memoryStorage();

// File filter to only allow certain file types
const fileFilter = (req, file, cb) => {
  console.log('Incoming file:', file);
  const filetypes = /jpeg|jpg|png|gif|mp3|wav|m4a/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Error: File upload only supports the following filetypes - ' + filetypes));
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 50 // 50MB max file size
  }
});

module.exports = upload;