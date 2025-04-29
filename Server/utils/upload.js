const multer = require('multer');
const multerS3 = require('multer-s3');
const { s3 } = require('./s3');

const upload = multer({
storage: multerS3({
s3: s3,
bucket: process.env.AWS_BUCKET_NAME,
contentType: multerS3.AUTO_CONTENT_TYPE,
key: function (req, file, cb) {
const userId = req.user.id || req.user.userId; // from JWT
let folder = 'misc';
if (file.fieldname === 'avatar') folder = 'profile/avatar';
else if (file.fieldname === 'coverImage') folder = 'profile/cover';
else if (file.fieldname === 'gallery') folder = 'gallery';
else if (file.fieldname === 'track') folder = 'tracks';
cb(null, `${userId}/${folder}/${Date.now()}-${file.originalname}`);
},
}),
limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max
});

module.exports = upload