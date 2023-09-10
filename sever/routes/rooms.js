const express = require("express");
const {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updatedRoom,
  updateRoomAvailability,
} = require("../controllers/room");

const router = express.Router();

//CREATE
router.post("/:hotelid", createRoom);
//UPDATE
router.put("/availability/:id", updateRoomAvailability);
router.put("/:id", updatedRoom);
//DELETE
router.delete("/:id/:hotelid", deleteRoom);
//GET
router.get("/:id", getRoom);
//GETALL
router.get("/", getRooms);

module.exports = router;
