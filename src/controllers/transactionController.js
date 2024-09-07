const Transaction = require("../models/transaction");
const Book = require("../models/book");
// controllers/transactionController.js

// Create a new transaction (issue a book)
const issueBook = async (req, res) => {
  try {
    const { bookName, userId, issueDate } = req.body;

    // // Validate if the user exists
    // const user = await user.findById(userId);
    // if (!user) {
    //   return res.status(404).json({ message: "User not found" });
    // }

    // Validate if the book exists
    const book = await Book.findOne({ name: bookName });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const newTransaction = new Transaction({
      bookName,
      userId,
      issueDate,
      rentPerDay: book.rentPerDay,
    });

    const savedTransaction = await newTransaction.save();
    res.status(201).json({
      message: "Book issued successfully",
      transaction: savedTransaction,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error issuing book", error: error.message });
  }
};

// Return a book
// const returnBook = async (req, res) => {
//   try {
//     const { bookName, userId, returnDate } = req.body;

//     const transaction = await Transaction.findOne({
//       bookName,
//       userId,
//       returnDate: { $exists: false },
//     });

//     if (!transaction) {
//       return res
//         .status(404)
//         .json({ message: "Transaction not found for this book and user" });
//     }

//     transaction.returnDate = returnDate;
//     const daysRented =
//       (new Date(returnDate) - new Date(transaction.issueDate)) /
//       (1000 * 60 * 60 * 24);
//     transaction.totalRent = daysRented * transaction.rentPerDay;

//     const updatedTransaction = await transaction.save();
//     res.status(200).json({
//       message: "Book returned successfully",
//       transaction: updatedTransaction,
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error returning book", error: error.message });
//   }
// };

// src/controllers/transactionController.js

const returnBook = async (req, res) => {
  try {
    const { bookName, userId, returnDate } = req.body;

    // Convert the returnDate to a Date object and validate
    const returnDateObj = new Date(returnDate);
    if (isNaN(returnDateObj.getTime())) {
      return res.status(400).json({ message: "Invalid return date" });
    }

    // Find the transaction where the book was issued and not yet returned
    const transaction = await Transaction.findOne({
      bookName,
      userId,
      returnDate: { $exists: false }, // Ensure it's not returned yet
    });

    if (!transaction) {
      return res
        .status(404)
        .json({ message: "Transaction not found or already returned" });
    }

    // Find the book by its name
    const book = await Book.findOne({ name: bookName });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Get the issue date from the transaction
    const issueDate = new Date(transaction.issueDate);

    // Strip time parts and focus only on date differences
    const issueDateOnly = new Date(issueDate.toDateString()); // Issue date without time
    const returnDateOnly = new Date(returnDateObj.toDateString()); // Return date without time

    // Calculate the difference in full days (including both issue and return dates)
    const daysRented = Math.max(
      1, // At least 1 day of rent even if issued and returned on the same day
      Math.ceil((returnDateOnly - issueDateOnly) / (1000 * 60 * 60 * 24)) + 1 // Include the return day
    );

    // Calculate total rent
    const totalRent = daysRented * book.rentPerDay;

    // Update the transaction with return date and total rent
    transaction.returnDate = returnDateObj;
    transaction.totalRent = totalRent;

    // Save the updated transaction to the database
    const updatedTransaction = await transaction.save();

    // Return success response
    res.status(200).json({
      message: "Book returned successfully",
      transaction: updatedTransaction,
    });
  } catch (error) {
    // Handle any errors
    res
      .status(500)
      .json({ message: "Error returning book", error: error.message });
  }
};

// src/controllers/transactionController.js

const getBookIssuers = async (req, res) => {
  const { bookName } = req.query;

  try {
    const transactions = await Transaction.find({ bookName });

    if (transactions.length === 0) {
      return res
        .status(404)
        .json({ message: "No transactions found for this book" });
    }

    const currentTransaction = transactions.find((t) => !t.returnDate);
    const issuers = transactions.map((t) => t.userId);

    res.json({
      totalCount: issuers.length,
      currentIssuer: currentTransaction
        ? currentTransaction.userId
        : "Not issued currently",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving book issuers", error: error.message });
  }
};

// src/controllers/transactionController.js

const getTotalRent = async (req, res) => {
  const { bookName } = req.query;

  try {
    const transactions = await Transaction.find({ bookName });

    const totalRent = transactions.reduce(
      (acc, t) => acc + (t.totalRent || 0),
      0
    );

    res.json({ totalRent });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving total rent", error: error.message });
  }
};

// src/controllers/transactionController.js

const getBooksIssuedToPerson = async (req, res) => {
  const { userId } = req.query;

  try {
    const transactions = await Transaction.find({ userId });

    const books = transactions.map((t) => ({
      bookName: t.bookName,
      issueDate: t.issueDate,
      returnDate: t.returnDate,
    }));

    res.json({ books });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving books issued to person",
      error: error.message,
    });
  }
};

// src/controllers/transactionController.js

const getBooksIssuedInDateRange = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: "Invalid date range" });
    }

    const transactions = await Transaction.find({
      issueDate: { $gte: start, $lte: end },
    });

    const result = transactions.map((t) => ({
      bookName: t.bookName,
      userId: t.userId,
      issueDate: t.issueDate,
      returnDate: t.returnDate,
    }));

    res.json({ transactions: result });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving books issued in date range",
      error: error.message,
    });
  }
};

module.exports = {
  issueBook,
  returnBook,
  getBookIssuers,
  getTotalRent,
  getBooksIssuedToPerson,
  getBooksIssuedInDateRange,
};
