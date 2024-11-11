const User = require("./../models/User");

const addFamilyMember = async (req, res) =>{
  const  {userId}  = req.body;
  const currentUserId = req.user._id;
  console.log(currentUserId);
  if (userId === currentUserId) {
    return res
      .status(400)
      .json({ message: "Cannot add self as family member" });
  }

  const user = await User.findById(currentUserId);
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const userToAdd = await User.findById(userId);
  if (!userToAdd) {
    return res.status(400).json({ message: "User to add not found" });
  }

  if (user.familyConnections.includes(userToAdd._id)) {
    return res
      .status(400)
      .json({ message: "User already exist as  family member" });
  }

  user.familyConnections.push(userId);
  await user.save();

  //simlar reciprocal logic for another userId
  if (userToAdd.familyConnections.includes(currentUserId._id)) {
    return res
      .status(400)
      .json({ message: "User already exist as  family member" });
  }
  userToAdd.familyConnections.push(currentUserId);
  await userToAdd.save();

  res.status(200).json({
    message: "User added as family member successfully",
  });
};

const getFamilyMember = async (req, res) => {
  const currentUserId = req.user._id;
  const myInfo = await User.findOne({ _id: currentUserId }).populate(
    "familyConnections",
    "username email profilePicture"
  );
  res.status(200).json({
    data: myInfo,
  });
};
module.exports = {
  addFamilyMember,
  getFamilyMember,
};
