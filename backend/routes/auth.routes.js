const express = require("express");
const { signUp, login, logout } = require("../controllers/auth.controller");
const router = express.Router();

router.post("/login", login);
router.post("/signup", signUp);
router.get("/logout", logout);

module.exports = router;
