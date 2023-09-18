const Hotel = require("../models/Hotel");
const Room = require("../models/Room");

exports.createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

exports.updatedHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

exports.deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    next(err);
  }
};
exports.getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

exports.getHotelsQuery = async (req, res, next) => {
  const { min, max, city, startDate, endDate, adult, room } = req.query;

  try {
    const hotels = await Hotel.find({
      city: city,
      cheapestPrice: { $gt: Number(min), $lt: Number(max) },
    });

    const availableHotels = await Promise.all(
      hotels.map(async (hotel) => {
        const rooms = await Room.find({
          _id: { $in: hotel.rooms },
          maxPeople: { $gte: adult },
          "roomNumbers.unavailableDates": {
            $not: {
              $elemMatch: {
                $gte: startDate,
                $lte: endDate,
              },
            },
          },
        });

        const roomB = await Room.find({
          _id: { $in: hotel.rooms },
          maxPeople: { $gte: adult },
          "roomNumbers.unavailableDates": {
            $elemMatch: {
              $gte: startDate,
              $lte: endDate,
            },
          },
        });

        let totalRoom = 0;

        if (roomB.length > 0) {
          roomB.forEach((r) =>
            r.roomNumbers.forEach((rb) => {
              if (rb.unavailableDates.length == 0) {
                totalRoom++;
              }
            })
          );
        }

        rooms.forEach((r) => (totalRoom = totalRoom + r.roomNumbers.length));

        if (totalRoom >= room) {
          return hotel;
        } else {
          return null;
        }
      })
    );

    const filteredHotels = availableHotels.filter((hotel) => hotel !== null);

    res.status(200).json(filteredHotels);
  } catch (err) {
    next(err);
  }
};
exports.getHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

exports.getHotelsRating = async (req, res, next) => {
  const limit = req.query.limit;
  try {
    const hotels = await Hotel.find().sort({ rating: -1 }).limit(limit);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

exports.countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

exports.countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });
    res.status(200).json([
      { type: "hotels", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

exports.getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
