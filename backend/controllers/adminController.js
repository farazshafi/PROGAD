import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js"
import generateTokens from "../utils/generateToken.js"

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

// @desc    delte user
// @route   DELETE /api/admin/delte_user/:id/
// @access  Private admin
export const delteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ message: "User deleted successfully" });
});



// @desc    get all products
// @route   GET /api/admin/all_products/
// @access  Private admin
export const getAllProducts = asyncHandler(async (req, res) => {
  try{
    const products = await Product.find({});
    res.status(200).json(products);
  }catch(err){
    console.error("Error getting products:", err.message);
    res.status(500).json({ message: "Server error while getting products" });
  }
});


// @desc    admin validation
// @route   POST /api/admin/admin_login
// @access  public admin
export const adminLogin = asyncHandler(async (req, res) => {
  const { email, password} = req.body;
  let userExist;

  // if (googleId) {
  //   userExist = await User.findOne({ googleId });
  //   if (!userExist) {
  //     userExist = await User.findOne({ email });
  //     if (userExist) {
  //       return res
  //         .status(400)
  //         .json({ message: "Email already associated with another account." });
  //     }
  //     userExist = await User.create({
  //       email,
  //       googleId,
  //       name,
  //       phoneNumber: phoneNumber || null,
  //       isVerified: true,
  //     });
  //   }
  //   return res.json({
  //     message: "Login successful",
  //     user: {
  //       _id: userExist._id,
  //       name: userExist.name,
  //       email: userExist.email,
  //       role: userExist.role,
  //       isAdmin: userExist.isAdmin,
  //       isVerified: userExist.isVerified,
  //       phoneNumber: userExist.phoneNumber,
  //       token: generateTokens(userExist._id),
  //     },
  //   });
  // }

  userExist = await User.findOne({ email });
  if (!userExist) {
    return res.status(400).json({ message: "User does not exist" });
  }
  if(!userExist.isAdmin && userExist.role !== "admin" ){
    return res.status(400).json({ message: "You are not an admin" });
  }

  if (!userExist.isVerified) {
    return res
      .status(400)
      .json({ message: "User not verified. Please verify your account." });
  }

  const isMatch = await userExist.matchPassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  res.status(200).json({
    message: "Login successful",
    user: {
      _id: userExist._id,
      name: userExist.name,
      email: userExist.email,
      role: userExist.role,
      isAdmin: userExist.isAdmin,
      isVerified: userExist.isVerified,
      token: generateTokens(userExist._id),
    },
  });
});
