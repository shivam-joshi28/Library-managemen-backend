// src/models/transaction.js
const mongoose = require("mongoose");

// Define the Transaction schema
const transactionSchema = new mongoose.Schema({
  bookName: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    ref: "User",
    required: true,
  },
  issueDate: {
    type: Date,
    required: true,
  },
  returnDate: {
    type: Date,
  },
  rentPerDay: {
    type: Number,
    required: true,
  },
  totalRent: {
    type: Number,
  },
});

// Create the Transaction model from the schema
const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
