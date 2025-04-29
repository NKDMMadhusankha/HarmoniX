const { S3Client, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const s3 = new S3Client({
region: process.env.AWS_REGION,
credentials: {
accessKeyId: process.env.AWS_ACCESS_KEY_ID,
secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
},
});

// Function to generate signed URL
const generateSignedUrl = async (key, expiresIn = 3600) => {
const command = new GetObjectCommand({
Bucket: process.env.AWS_BUCKET_NAME,
Key: key,
});

return await getSignedUrl(s3, command, { expiresIn });
};

// Function to delete an object from S3
const deleteFromS3 = async (key) => {
const command = new DeleteObjectCommand({
Bucket: process.env.AWS_BUCKET_NAME,
Key: key,
});

try {
await s3.send(command);
return true;
} catch (err) {
console.error('Error deleting from S3:', err);
return false;
}
};

module.exports = { s3, generateSignedUrl, deleteFromS3 }