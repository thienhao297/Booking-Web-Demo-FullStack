const Transactions = require("../models/Transaction");
const Hotel = require("../models/Hotel");

exports.createTransactions = async (req, res, next) => {
  const hotel = await Hotel.findById(req.body.hotel);

  const newTransactions = new Transactions({
    user: req.body.user,
    hotel: hotel.name,
    room: req.body.room,
    dateStart: req.body.dateStart,
    dateEnd: req.body.dateEnd,
    price: req.body.price,
    payment: req.body.payment,
  });
  try {
    const savedTransactions = await newTransactions.save();
    res.status(200).json(savedTransactions);
  } catch (err) {
    next(err);
  }
};

exports.getTransactions = async (req, res, next) => {
  try {
    const trans = await Transactions.find({
      "user.userId": req.params.id,
    });
    const sortTrans = trans.sort((a, b) => b.createdAt - a.createdAt);
    res.status(200).json(sortTrans);
  } catch (err) {
    next(err);
  }
};

exports.getAllTransactions = async (req, res, next) => {
  try {
    const trans = await Transactions.find();
    const sortTrans = trans.sort((a, b) => b.createdAt - a.createdAt);
    res.status(200).json(sortTrans);
  } catch (err) {
    next(err);
  }
};
