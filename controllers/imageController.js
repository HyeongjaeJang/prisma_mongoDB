const cloudinary = require("../config/cloudinary");

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file provided" });
    }

    cloudinary.uploader.upload(
      req.file.path,
      { resource_type: "auto" },
      (error, result) => {
        if (result && result.secure_url) {
          return res
            .status(200)
            .json({ message: "Image uploaded", imageUrl: result.secure_url });
        } else {
          return res.status(500).json({ error: "Image upload failed" });
        }
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
