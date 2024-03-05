const GameModel = require("../models/game.model");

module.exports.addGame = async (req, res, next) => {
  try {
    console.log(req.body.age);
    const game = await GameModel.create({
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      duration: req.body.duration,
      age: req.body.age,
      playersNumber: req.body.playersNumber,
    });
    console.log(game);
    res.status(200).json(game);
  } catch (err) {
    const error = new Error("Le formulaire n'a pas pu etre réalisé");
    error.source = "addGame";
    error.initialError = err;
    next(error);
    // res.status(500).json({ message: "error 500" });
  }
};

module.exports.getAllGames = async (req, res, next) => {
  console.log("get all games");
  try {
    const games = await GameModel.find();
    res.status(200).json(games);
    // next("logout");
  } catch (err) {
    let error = new Error("Impossible de récupérer tous les jeux");
    error.source = "getAllGames";
    error.initialError = err;
    next(error);
  }
};

module.exports.deleteGame = async (req, res, next) => {
  try {
    const game = await GameModel.findByIdAndDelete(req.params.id);
    res.status(200).json(req.params);
  } catch (error) {
    res.status(500).json({ message: "error 500" });
  }
};

module.exports.updateGame = async (req, res, next) => {
  try {
    const game = await GameModel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        duration: req.body.duration,
        age: req.body.age,
        playersNumber: req.body.playersNumber,
      },
      { new: true, runValidators: true },
    );
    if (!game) return res.status(404).json({ message: "game not found" });

    res.status(200).json(game);
  } catch (err) {
    let error = new Error("Veuillez vérifier votre formulaire");
    error.source = "updateGame";
    error.initialError = err;
    next(error);
  }
};

module.exports.getGame = async (req, res, next) => {
  try {
    const game = await GameModel.findById(req.params.id);
    res.status(200).json(game);
  } catch (err) {
    let error = new Error("Impossible de récupérer le jeu");
    error.source = "getGame";
    error.initialError = err;
    next(error);
  }
};
