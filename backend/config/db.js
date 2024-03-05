const mongoose = require("mongoose");
require("dotenv").config(); // Assurez-vous que votre fichier .env contient la variable MONGO_URI

const connectDB = async () => {
  try {
    // Ajoutez l'appel à mongoose.connect ici
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected...`); // Ce message sera affiché une fois la connexion établie avec succès
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Quitte le processus avec un code d'erreur en cas d'échec de la connexion
  }
};

module.exports = connectDB;
