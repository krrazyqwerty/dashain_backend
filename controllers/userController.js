const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


/*
registration ko lagi */
const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    /* check if user is already registered or not */
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
/* if user is not registered, then create a new user*/
    user = new User({
      username,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
/* yo chai database ma save garna ko lagi*/
    await user.save();
    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};


/* login ko lagi */
const login = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username, email, password);
  try {
    const user = await User.findOne({ email });
    // console.log(user);
    

    if (!user || !(await bcrypt.compare(password, user.password))) {
      // console.log("Login error")
      return res.status(401).json({ message: "Invalid credentials" });      
    }
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, 
      {
      expiresIn: "1h",
    }
  );
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  register,
  login,
};
