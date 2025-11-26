// For local fallback, just save in /uploads, else integrate Cloudinary/S3
exports.uploadPhoto = async (file) => {
  // Return URL of stored photo
  return `/uploads/${file.filename}`;
};
