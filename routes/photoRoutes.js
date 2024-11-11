const express = require("express");
const photoRoutes = express.Router();
const authValidation = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const { uploadPhoto } = require("../controllers/photoController");

photoRoutes.post(
  "/upload",
  authValidation,
  (req, res, next) => {
    if (!res.user) {
      return res.status(401).json({
        error: "Authentication Required!",
      });
    }
    next();
  },
  upload.single("photo"),
  (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ error: "Please upload an Image" });
    }
    next();
  },

  uploadPhoto
);

module.exports = photoRoutes;
