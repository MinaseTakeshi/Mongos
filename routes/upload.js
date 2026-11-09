const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");
const requireAuth = require("../middleware/auth");

router.post('/upload', requireAuth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'lesson7_uploads' },
            (error, result) => (error ? reject(error) : resolve(result))
        );

        stream.end(req.file.buffer);
    });

    res.json({ url: result.secure_url, publicId: result.public_id });
} catch (error){
    res.status(500).json({ error: error.message });
}
});

module.exports = router;