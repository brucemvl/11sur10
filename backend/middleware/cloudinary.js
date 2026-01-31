const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Config Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage Multer pour Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'avatars',        // Tous les avatars iront dans ce dossier
    format: 'jpg',            // Conversion automatique en JPG
    transformation: [{ width: 500, height: 500, crop: 'fill' }], // recadrage carré
  },
});

const upload = multer({ storage });

module.exports = { upload, cloudinary };