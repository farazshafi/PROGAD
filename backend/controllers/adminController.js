import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

// @desc    get all users details
// @route   GET /api/admin/get_users
// @access  private admin
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");
  res.status(200).json(users);
});

// @desc    Block / Unblock the user
// @route   PATCH /api/admin/block_unblock_user/:id/
// @access  Private admin
export const blockUnblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { isBlocked } = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { isBlocked },
    { new: true }
  ).select("-password")
  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({
    user: updatedUser,
  });
});
