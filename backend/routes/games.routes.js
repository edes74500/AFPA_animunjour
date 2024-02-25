const express = require("express");
const router = express.Router();
const { setGame, getAllGames, deleteGame, updateGame, getGame } = require("../controllers/games.controller");

router.post("/new-game", setGame);
router.get("/get-game/:id", getGame);
router.get("/all-games", getAllGames);
router.put("/update-game/:id", updateGame);
router.delete("/delete-game/:id", deleteGame);

module.exports = router;
