// controllers/userController.js
const User = require("../models/user");

// API to Create a new user
const createUser = async (req, res) => {
  try {
    const newUser = new User({
      user_id: req.body.user_id,
      name: req.body.name,
      email: req.body.email,
    });

    const savedUser = await newUser.save();
    res.status(201).json({
      message: "User successfully added",
      user: savedUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

// API to Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "Users retrieved successfully",
      users,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving users", error: error.message });
  }
};

module.exports = { createUser, getUsers };
