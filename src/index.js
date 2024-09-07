// // src/index.js
// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");
// const userRoutes = require("./routes/userRoutes");
// const bookRoutes = require("./routes/bookRoutes");
// const transactionRoutes = require("./routes/transactionRoutes");

// require("dotenv").config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(express.json());

// // Routes
// app.use("/users", userRoutes);
// app.use("/books", bookRoutes);
// app.use("/transactions", transactionRoutes);

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
const express = require("express");
const cors = require("cors"); // Import CORS middleware
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Enable CORS for all routes
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  })
);

// Routes
app.use("/users", userRoutes);
app.use("/books", bookRoutes);
app.use("/transactions", transactionRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
