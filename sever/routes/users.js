const express = require("express");
const {
  deleteUser,
  getUser,
  getUsers,
  updatedUser,
} = require("../controllers/user");

const router = express.Router();

//UPDATE
router.put("/:id", updatedUser);
//DELETE
router.delete("/:id", deleteUser);
//GET
router.get("/:id", getUser);
//GETALL
router.get("/", getUsers);

module.exports = router;
