// src/routes/transactionRoutes.js
const express = require("express");
const router = express.Router();
const {
  issueBook,
  returnBook,
  getBookIssuers,
  getTotalRent,
  getBooksIssuedToPerson,
  getBooksIssuedInDateRange,
} = require("../controllers/transactionController"); // Import controller functions

// Route to issue a book
router.post("/issue", issueBook);

// Route to return a book
router.put("/return", returnBook);
router.get("/book-issuers", getBookIssuers);
router.get("/total-rent", getTotalRent);
router.get("/issued-books", getBooksIssuedToPerson);
router.get("/date-range", getBooksIssuedInDateRange);

module.exports = router;
