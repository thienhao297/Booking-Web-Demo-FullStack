const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    user: {
      name: {
        type: String,
        required: true,
      },
      userId: {
        type: String,
        required: true,
      },
    },
    hotel: {
      type: String,
      required: true,
    },
    room: {
      type: [String],
      required: true,
    },
    dateStart: {
      type: Number,
      required: true,
    },
    dateEnd: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    payment: {
      type: String,
      required: true,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
