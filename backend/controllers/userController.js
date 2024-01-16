const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const userModel = require("../models/userModel");

exports.registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await userModel.findOne({ email });

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required !" });
    }

    if (user) {
      return res
        .status(400)
        .json({ error: "User with the given email already exist!" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Enter a valid email !" });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        error:
          "Password must be a strong password : { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}",
      });
    }

    user = new userModel({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    res.status(200).json({ _id: user._id, name, email });
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password !" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ error: "Invalid email or password !" });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    return res.json({
      token,
      user: { _id: user._id, name: user.name, email: email, role: user.role },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

exports.signout = (req, res) => {
  console.log("SignOut");
  // delete token in the cookie
  res.clearCookie("token");
  res.json({
    message: "User Signout !",
  });
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password");
    res.status(200).json({
      user: users,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

exports.findUser = async (req, res) => {
  req.profile.password = undefined;

  res.status(200).json({
    user: req.profile,
  });
};
