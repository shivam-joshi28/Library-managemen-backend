const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // Add any additional fields you require
});

// Register the model with the name "User"
const User = mongoose.model("User", UserSchema);

module.exports = User;
