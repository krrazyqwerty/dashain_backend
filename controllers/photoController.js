const Photo = require("../models/Photo");

const uploadPhoto = async (req, res) => {
  const { description } = req.body;
  const currentUser = req.user._id;
  const phtotUrl = `/uploads/${req.file.filename}`;
  const photo = await Photo.create({
    userId: currentUser,
    description,
    imageUrl: phtotUrl,
  });
  res.status(200).json(photo);
};
module.exports = { uploadPhoto };
