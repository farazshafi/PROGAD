import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generageTokens from "../utils/generateToken.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import dotenv from "dotenv";
import generateTokens from "../utils/generateToken.js";

dotenv.config();

// Setup Nodemailer transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  timeout: 10000,
});

const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

// @desc    Register a new user or sign in with Google
// @route   POST /api/user/register
// @access  public
export const userRegistration = asyncHandler(async (req, res) => {
  const { name, email, password, phoneNumber, googleId } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).json({ message: "Email already exists" });
  }

  let user;

  if (googleId) {
    user = await User.create({
      email,
      name,
      googleId,
      phoneNumber: phoneNumber || null,
      isVerified: true,
    });
    return res.status(201).json({
      message: "Google sign-in successful!",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isAdmin: user.isAdmin,
        isVerified: user.isVerified,
        phoneNumber: user.phoneNumber,
        token: generateTokens(),
      },
    });
  }

  const otp = generateOTP();

  user = await User.create({
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

  try {
    await transporter.sendMail(mailOptions);
    res.status(201).json({
      message: "Please verify your OTP.",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isAdmin: user.isAdmin,
        isVerified: user.isVerified,
        phoneNumber: user.phoneNumber,
        token: generateTokens(),
      },
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res
      .status(400)
      .json({ message: "Error sending OTP", error: error.message });
  }
  console.log("after sendig mail");
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
  const { email, password, googleId, phoneNumber, name } = req.body;
  let userExist;

  if (googleId) {
    userExist = await User.findOne({ googleId });
    if (!userExist) {
      userExist = await User.findOne({ email });
      if (userExist) {
        return res
          .status(400)
          .json({ message: "Email already associated with another account." });
      }
      userExist = await User.create({
        email,
        googleId,
        name,
        phoneNumber: phoneNumber || null,
        isVerified: true,
      });
    }
    return res.json({
      message: "Login successful",
      user: {
        _id: userExist._id,
        name: userExist.name,
        email: userExist.email,
        role: userExist.role,
        isAdmin: userExist.isAdmin,
        isVerified: userExist.isVerified,
        phoneNumber: userExist.phoneNumber,
        token: generateTokens(userExist._id),
      },
    });
  }

  userExist = await User.findOne({ email });
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
