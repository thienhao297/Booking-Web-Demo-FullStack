const express = require("express");
const {
  createTransactions,
  getTransactions,
  getAllTransactions,
} = require("../controllers/transaction");

const router = express.Router();

//CREATE
router.post("/", createTransactions);
//GET
router.get("/:id", getTransactions);
//GETALL
router.get("/", getAllTransactions);

module.exports = router;
