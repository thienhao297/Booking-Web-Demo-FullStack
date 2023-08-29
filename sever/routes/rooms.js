const express = require("express");
const {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updatedRoom,
  updateRoomAvailability,
} = require("../controllers/room");

const { verifyAdmin } = require("../utils/verifiToken");

const router = express.Router();

//CREATE
router.post("/:hotelid", verifyAdmin, createRoom);
//UPDATE
router.put("/availability/:id", updateRoomAvailability);
router.put("/:id", verifyAdmin, updatedRoom);
//DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);
//GET
router.get("/:id", getRoom);
//GETALL
router.get("/", getRooms);

module.exports = router;
