const express = require("express");
const { setPosts, getPosts } = require("../controllers/post.controller");
const router = express.Router();
const upload = require("../config/multerConfig");

router.get("/", getPosts);

router.post("/", setPosts);

router.put("/:id", (req, res) => {
  res.json({ messageID: req.params.id });
});

router.delete("/:id", (req, res) => {
  res.json({ message: `message deleted : ${req.params.id}` });
});

router.patch("/like-post/:id", (req, res) => {
  res.json({ message: `message liked : ${req.params.id}` });
});

router.patch("/dislike-post/:id", (req, res) => {
  res.json({ message: `message disliked : ${req.params.id}` });
});

router.post("/upload-image", upload.single("img"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.status(200).json(req.file);
});

module.exports = router;
