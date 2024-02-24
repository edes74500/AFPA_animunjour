const PostModel = require("../models/post.model");

module.exports.getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

module.exports.setPosts = async (req, res) => {
  try {
    const post = await PostModel.create({
      message: req.body.message,
      author: req.body.author,
    });
    res.status(200).json(post);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Missing something", details: error.message });
    }
    // Pour les autres types d'erreurs non liées à la validation
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};
