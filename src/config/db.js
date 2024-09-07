const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file

// Get the MongoDB connection string from environment variables
const mongoURI = process.env.MONGO_URI;
// console.log("MongoDB URI:", mongoURI); // Debugging statement

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully.");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit process with failure code
  }
};

module.exports = connectDB;
