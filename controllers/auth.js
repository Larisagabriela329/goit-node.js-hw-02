const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp").default;
const gravatar = require("gravatar");

const SECRET_KEY = process.env.JWT_SECRET; 

const signup = async (req, res) => {
  const { email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(409).json({ message: "Email in use" });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, { s: '250', d: 'retro' }, true);
  
  const newUser = await User.create({ email, password: hashPassword, avatarURL });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL
    },
  });
}; 

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });

  res.status(204).send();
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  const allowedSubscriptions = ["starter", "pro", "business"];
  if (!allowedSubscriptions.includes(subscription)) {
    return res.status(400).json({ message: "Invalid subscription type" });
  }

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );

  res.json({
    email: updatedUser.email,
    subscription: updatedUser.subscription,
  });
};

const avatarsDir = path.join(__dirname, "../public/avatars");

const updateAvatar = async (req, res) => {

  const { path: tempUpload, originalname } = req.file;
if (!req.file) {
  return res.status(400).json({ message: "No file uploaded" });
}


  const { _id } = req.user;

  const filename = `${_id}-${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);

  try {
    const image = await Jimp.read(tempUpload);
    await image.resize(250, 250).writeAsync(tempUpload);
  } catch (err) {
    console.error("Jimp processing error:", err);
    return res.status(500).json({ message: "Error processing image" });
  }
  

  await fs.rename(tempUpload, resultUpload);

  const avatarURL = `/avatars/${filename}`;
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
};

module.exports = {
  signup,
  login,
  logout,
  getCurrent,
  updateSubscription,
  updateAvatar
};
