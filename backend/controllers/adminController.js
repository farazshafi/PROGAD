import User from "../models/userModel.js";
import asyncHandler from "express-async-handler"

// @desc    get all users details
// @route   GET /api/admin/get_users
// @access  private admin
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password")
  res.status(200).json(users);
});
