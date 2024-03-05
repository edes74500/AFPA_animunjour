const UserModel = require("../models/users.model");
const mongoose = require("mongoose");
// const ObjectID = require("mongoose").ObjectID;

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select(`-password`);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "error 500, can't get all users" });
  }
};

module.exports.getUser = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  try {
    const user = await UserModel.findById(req.params.id).select(`-password`);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "error 500" });
  }
};

module.exports.updateUserPassword = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  try {
    const user = await UserModel.findById(req.params.id);
    if (req.body.password) user.password = req.body.password;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    if (error.name === "ValidationError") {
      // Gérer spécifiquement les erreurs de validation ici
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "error 500" });
    }
  }
};

module.exports.updateUser = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    const updateData = {
      username: req.body.username,
      email: req.body.email,
      bio: req.body.bio,
    };
    const options = { new: true, runValidators: true };

    const user = await UserModel.findByIdAndUpdate(req.params.id, updateData, options);
    res.status(200).json(user);
  } catch (error) {
    if (error.name === "ValidationError") {
      // Gérer spécifiquement les erreurs de validation ici
      res.status(400).json({ message: error.message });
    } else res.status(500).json({ message: "error 500" });
  }
};

module.exports.deleteUser = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json("user deleted " + user.username);
  } catch (error) {
    res.status(500).json({ message: "error 500" });
  }
};
