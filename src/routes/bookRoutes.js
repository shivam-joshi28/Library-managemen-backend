const express = require("express");
const {
  getBooks,
  createBook,
  searchBooksByName,
  getBooksByPrice,
  filterBooksByCategoryAndNameAndPrice,
} = require("../controllers/bookController");

const router = express.Router();

router.get("/", getBooks);
router.post("/", createBook);
router.get("/search", searchBooksByName);
router.get("/filter/price", getBooksByPrice); // Updated route for single price
router.get("/filter/advanced", filterBooksByCategoryAndNameAndPrice); // Updated route

module.exports = router;
