const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    image: {
      type: String, // URL de l'image ou chemin du fichier
    },
    likers: {
      type: [String],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("2", postSchema);
