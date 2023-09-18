const express = require("express");
const {
  createTransactions,
  getTransactions,
  getAllTransactions,
} = require("../controllers/transaction");

const router = express.Router();

//CREATE
router.post("/", createTransactions);
router.get("/:id", getTransactions);
router.get("/", getAllTransactions);

module.exports = router;
