const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
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
      type: String,
      required: true,
    },
    dateEnd: {
      type: String,
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
