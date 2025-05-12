const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { v4: uuidv4 } = require('uuid');

// Log credentials for debugging
console.log('AWS_ACCESS_KEY_ID:', process.env.AWS_ACCESS_KEY_ID ? 'Loaded' : 'Missing');
console.log('AWS_SECRET_ACCESS_KEY:', process.env.AWS_SECRET_ACCESS_KEY ? 'Loaded' : 'Missing');
console.log('AWS_BUCKET_NAME:', process.env.AWS_BUCKET_NAME ? 'Loaded' : 'Missing');
console.log('AWS_REGION:', process.env.AWS_REGION ? 'Loaded' : 'Missing');

// Initialize S3 client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Function to upload an image to S3
const uploadToS3 = async (file, userId) => {
  try {
    if (!file) throw new Error('No file provided');

    const key = `studios/${userId}/${uuidv4()}-${file.originalname}`;
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await s3.send(new PutObjectCommand(uploadParams));

    // Return just the key, not the full URL
    return key;
  } catch (err) {
    console.error('Error uploading to S3:', err.message);
    throw err;
  }
};

module.exports = { uploadToS3 };
