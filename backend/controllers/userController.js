import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

// @desc    Register a new user
// @route   POST /api/user/register
// @access  public
export const userRegistration = asyncHandler(async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;
  const userExist = await User.findOne({ email });
  if(userExist){
    return res.status(400).json({ message: "Email already exists" });
  }
  const user = await User.create({
    email,
    name,
    password,
    phoneNumber,
  })
  if(user){
    res.status(201).json({ message: "User registered successfully" });
  }
});
