import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generageTokens from "../utils/generateToken.js";

// @desc    Register a new user
// @route   POST /api/user/register
// @access  public
export const userRegistration = asyncHandler(async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).json({ message: "Email already exists" });
  }
  const user = await User.create({
    email,
    name,
    password,
    phoneNumber,
  });
  if (user) {
    res.status(201).json({ message: "User registered successfully" });
  }
});

// @desc    user validation
// @route   POST /api/user/login
// @access  public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (!userExist) {
    return res.status(400).json({ message: "User does not exist" });
  }
  const isMatch = await userExist.matchPassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  res.json({
    _id: userExist._id,
    name: userExist.name,
    email: userExist.email,
    role: userExist.role,
    isAdmin: userExist.isAdmin,
    token: generageTokens()
  });
});
