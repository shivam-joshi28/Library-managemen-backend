const Book = require("../models/book");

// Get all books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Add a new book
const createBook = async (req, res) => {
  const { name, category, rentPerDay } = req.body;
  const newBook = new Book({ name, category, rentPerDay });
  try {
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: "Error creating book" });
  }
};

// Get books by name or term
const searchBooksByName = async (req, res) => {
  const { name } = req.query;
  try {
    const books = await Book.find({ name: { $regex: name, $options: "i" } });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get books by a single price
const getBooksByPrice = async (req, res) => {
  const { price } = req.query;
  try {
    const books = await Book.find({ rentPerDay: { $eq: price } });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Filter books by category, name, and single price
const filterBooksByCategoryAndNameAndPrice = async (req, res) => {
  const { category, name, price } = req.query;
  try {
    const query = {};
    if (category) {
      // Case-insensitive search for category
      query.category = { $regex: category, $options: "i" };
    }
    if (name) query.name = { $regex: name, $options: "i" };
    if (price) query.rentPerDay = { $eq: Number(price) };

    const books = await Book.find(query);
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getBooks,
  createBook,
  searchBooksByName,
  getBooksByPrice,
  filterBooksByCategoryAndNameAndPrice,
};
