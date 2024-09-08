const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  user_id: {
    type: String, // Use String or any other type you prefer for custom IDs
    required: true,
  },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // Add any additional fields you require
});

// Register the model with the name "User"

module.exports = mongoose.model("User", UserSchema);
