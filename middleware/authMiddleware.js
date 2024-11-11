const jwt = require("jsonwebtoken");
const User = require('../models/User');

const authValidation = async (req, res, next)=>{
    const token = req?.headers["authorization"]?.split(" ")[1];

    if (!token){
        return res.status(401).json({ msg: "No token, authorization declined!"});
    }
try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user){
        return res.status(401).json({ msg: "User not found with provided token"});
    }
    req.user =user;

    next();
}catch (err){
    console.log(err)
    res.status(401).json({ msg: "Invalid token Provided"})
}
};
module.exports = authValidation;