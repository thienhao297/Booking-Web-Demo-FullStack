const express = require("express");
const {
  createTransactions,
  getTransactions,
} = require("../controllers/transaction");

const router = express.Router();

//CREATE
router.post("/", createTransactions);
router.get("/:id", getTransactions);

module.exports = router;
