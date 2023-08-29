const express = require("express");
const {
  deleteUser,
  getUser,
  getUsers,
  updatedUser,
} = require("../controllers/user");

const { verifyAdmin, verifyUser } = require("../utils/verifiToken");

const router = express.Router();

//UPDATE
router.put("/:id", verifyUser, updatedUser);
//DELETE
router.delete("/:id", verifyUser, deleteUser);
//GET
router.get("/:id", verifyUser, getUser);
//GETALL
router.get("/", verifyAdmin, getUsers);

module.exports = router;
