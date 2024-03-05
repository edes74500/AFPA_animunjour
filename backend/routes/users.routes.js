const express = require("express");
const {
  addUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  updateUserPassword,
} = require("../controllers/users.controller");
const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUser);

// router.post("/", addUser);

router.put("/:id", updateUser);
router.put("/password/:id", updateUserPassword);

router.delete("/:id", deleteUser);

module.exports = router;
