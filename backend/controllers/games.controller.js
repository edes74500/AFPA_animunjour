const GameModel = require("../models/game.model");

module.exports.setGame = async (req, res) => {
  try {
    const game = await GameModel.create({
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      duration: req.body.duration,
      age: req.body.age,
      playersNumber: req.body.playersNumber,
    });
    res.status(200).json("done");
  } catch (error) {
    res.status(400).json({ message: "Missing something" });
    // res.status(500).json({ message: "error 500" });
  }
};

module.exports.getAllGames = async (req, res) => {
  try {
    const games = await GameModel.find();
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ message: "error 500" });
  }
};

module.exports.deleteGame = async (req, res) => {
  try {
    const game = await GameModel.findByIdAndDelete(req.params.id);
    res.status(200).json("post supprimé");
  } catch (error) {
    res.status(500).json({ message: "error 500" });
  }
};

module.exports.updateGame = async (req, res) => {
  try {
    const game = await GameModel.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      duration: req.body.duration,
      age: req.body.age,
      playersNumber: req.body.playersNumber,
    });
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ message: "error 500" });
  }
};

module.exports.getGame = async (req, res) => {
  try {
    const game = await GameModel.findById(req.params.id);
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ message: "error 500" });
  }
};
