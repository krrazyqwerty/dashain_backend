const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads");
    }
    cb(null, "upload/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.statswith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Please upload an image!"), false);
  }
};

const upload = multer({
  storage: storage, // Configures where uploaded files will be stored using the storage config defined above
  fileFilter: fileFilter, // Uses the fileFilter function above to only allow image files
  limits: {
    fileSize: 10 * 1024 * 1024, // Limits maximum file size to 10MB (10 * 1024 * 1024 bytes, that would be somewhere around 10mb in this case)
  },
});

module.exports = upload;



