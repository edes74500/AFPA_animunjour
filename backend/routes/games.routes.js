const express = require("express");
const router = express.Router();
const { addGame, getAllGames, deleteGame, updateGame, getGame } = require("../controllers/games.controller");

router.post("/add-game", addGame);
// router.get("/get-game/:id", getGame);
router.get("/get-game/:id", getGame);
// router.get("/all-games", getAllGames);
router.get("/all-games", getAllGames);
router.put("/update-game/:id", updateGame);
router.delete("/delete-game/:id", deleteGame);

module.exports = router;
