const mongoose = require("mongoose");

function generateCollectionName(schema) {
  // Ici, vous pouvez implémenter la logique pour générer le nom de la collection
  // en utilisant des informations du schéma ou d'autres variables
  return `games_${schema.name}`;
}

const gameSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    likes: [],
    duration: {
      type: String,
      required: true,
    },
    age: {
      type: {
        endAge: {
          type: String,
          required: true,
        },
        startAge: {
          type: String,
          required: true,
        },
      },
      _id: false, // Définir la valeur par défaut de age._id à null
    },
    comments: {
      type: [
        {
          date: {
            type: Date,
            default: Date.now,
          },
          text: {
            type: String,
            required: true,
          },
          author: {
            type: String,
            required: true,
          },
        },
      ],
    },
    playersNumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const collectionName = generateCollectionName(gameSchema);

module.exports = mongoose.model("games", gameSchema);
