const express = require("express");

const {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotels,
  getHotelsQuery,
  updatedHotel,
  getHotelsRating,
  getHotelRooms,
} = require("../controllers/hotel.js");

const router = express.Router();

//CREATE
router.post("/", createHotel);
//UPDATE
router.put("/:id", updatedHotel);
//DELETE
router.delete("/:id", deleteHotel);
//GET
router.get("/find/:id", getHotel);
//GETALL
router.get("/", getHotels);
router.get("/query", getHotelsQuery);
router.get("/rating", getHotelsRating);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);
module.exports = router;
