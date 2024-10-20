import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generageTokens from "../utils/generateToken.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import dotenv from "dotenv"

dotenv.config()

// Setup Nodemailer transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password
  },
});

const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

// @desc    Register a new user
// @route   POST /api/user/register
// @access  public
export const userRegistration = asyncHandler(async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const otp = generateOTP();

  const user = await User.create({
    email,
    name,
    password,
    phoneNumber,
    otp,
    isVerified: false,
  });

  // Send OTP via email
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP for account verification",
    text: `Your OTP for verifying your account is ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending OTP:", error);
      return res.status(500).json({ message: "Error sending OTP", error: error.message });
    } else {
      res.status(201).json({
        message: "Please verify your OTP.",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isAdmin: user.isAdmin,
          isVerified: user.isVerified,
          token: generageTokens(),
        },
      });
    }
  });
});

// @desc    Verify OTP
// @route   POST /api/user/verify_otp
// @access  public
export const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  const userExist = await User.findOne({ email });
  if (!userExist) {
    return res.status(400).json({ message: "User does not exist" });
  }
  if (Number(userExist.otp) !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }
  userExist.isVerified = true;
  userExist.otp = null;
  await userExist.save();
  res.json({ message: "User verified successfully" });
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
  if (!userExist.isVerified) {
    return res
      .status(400)
      .json({ message: "User not verified. Please verify your account." });
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
    isVerified: userExist.isVerified,
    token: generageTokens(),
  });
});

