const UserModel = require("../models/users.model");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);
    // console.log(user);
    const token = await generateToken(user._id);
    res.cookie("jwt", token, { maxAge: process.env.JWT_EXPIRES_IN, httpOnly: true });
    res.status(200).json({ message: "cookie genere pour ", user: user.username });
  } catch (err) {
    next(err);
    return;
  }
};

module.exports.signUp = async (req, res) => {
  try {
    const user = await UserModel.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      res.status(400).json({ message: "Missing required fields" });
    } else {
      res.status(500).json({ message: "An error occurred " + error });
    }
  }
};

module.exports.logout = async (req, res) => {
  res.cookie("jwt", "", { expires: new Date(0) });
  res.status(200).json({ message: "cookie cleared" });
};
