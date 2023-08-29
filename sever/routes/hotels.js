const express = require("express");

const {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotels,
  updatedHotel,
  getHotelsRating,
  getHotelRooms,
} = require("../controllers/hotel.js");

const { verifyAdmin } = require("../utils/verifiToken");

const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createHotel);
//UPDATE
router.put("/:id", verifyAdmin, updatedHotel);
//DELETE
router.delete("/:id", verifyAdmin, deleteHotel);
//GET
router.get("/find/:id", getHotel);
//GETALL
router.get("/", getHotels);
router.get("/rating", getHotelsRating);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);
module.exports = router;
