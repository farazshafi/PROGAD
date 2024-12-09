import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generageTokens from "../utils/generateToken.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import generateTokens from "../utils/generateToken.js";
import Address from "../models/addressModel.js";

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
  const passwordRegex =
    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[^\s])[A-Za-z\d!@#$%^&*]{6,25}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must be 6-25 characters, contain at least one number, one special character, and no whitespace.",
    });
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
  console.log("otp :", otp)

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
    setTimeout(async () => {
      await User.updateOne({ _id: user._id }, { $unset: { otp: "" } });
    }, 1 * 60 * 1000);
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

  if (!userExist.otp) {
    return res
      .status(400)
      .json({ message: "OTP has expired. Please request a new one." });
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
    userExist = await User.findOne({ googleId }).populate({
      path: "addresses",
      select:
        "_id type street apartment city state zip country phoneNumber email",
    });
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
    if (userExist.isBlocked) {
      return res
        .status(400)
        .json({ message: "User is Blocked! , Not Allowed to Continue" });
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
        addresses: userExist.addresses || null,
        token: generateTokens(userExist._id),
      },
    });
  }

  userExist = await User.findOne({ email }).populate({
    path: "addresses",
    select:
      "_id type street apartment city state zip country phoneNumber email",
  });
  if (!userExist) {
    return res.status(400).json({ message: "User does not exist" });
  }

  if (userExist.isBlocked) {
    return res
      .status(400)
      .json({ message: "User is Blocked!, Not Allowed to continued" });
  }

  if (!userExist.isVerified) {
    const otp = generateOTP();
    userExist.otp = otp;
    await userExist.save();
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP for account verification",
      text: `Your OTP for verifying your account is ${otp}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      setTimeout(async () => {
        await User.findByIdAndUpdate(userExist._id, { $unset: { otp: "" } });
      }, 1 * 60 * 1000);
      res.status(201).json({
        message: "login success",
        warning: "Please verify your OTP.",
        user: {
          _id: userExist._id,
          name: userExist.name,
          email: userExist.email,
          role: userExist.role,
          isAdmin: userExist.isAdmin,
          isVerified: userExist.isVerified,
          phoneNumber: userExist.phoneNumber,
          city: userExist.city,
          country: userExist.country,
          isBlocked: userExist.isBlocked,
          addresses: userExist.addresses || null,
          token: generateTokens(),
        },
      });
    } catch (error) {
      console.error("Error sending OTP:", error);
      res
        .status(400)
        .json({ message: "Error sending OTP", error: error.message });
    }
    return;
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
      city: userExist.city,
      country: userExist.country,
      phone: userExist.phone,
      isBlocked: userExist.isBlocked,
      addresses: userExist.addresses || null,
      token: generateTokens(userExist._id),
    },
  });
});

// @desc    Resend OTP
// @route   POST /api/user/verify_otp
// @access  public
export const resendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const userExist = await User.findOne({ email });
  if (!userExist) {
    return res.status(400).json({ message: "User does not exist" });
  }
  if (userExist.isVerified) {
    return res.status(400).json({ message: "User already verified" });
  }
  const otp = generateOTP();
  userExist.otp = otp;
  await userExist.save();
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP for account verification",
    text: `Your OTP for verifying your account is ${otp}`,
  };
  try {
    await transporter.sendMail(mailOptions);
    setTimeout(async () => {
      await User.findByIdAndUpdate(userExist._id, { $unset: { otp: "" } });
    }, 1 * 60 * 1000);

    res.status(200).json({ message: "OTP resent successfully" });
  } catch (err) {
    console.error("Error sending OTP:", err);
    res.status(400).json({ message: "Error sending OTP", error: err.message });
  }
});

// @desc    Edit User
// @route   PATCH /api/user/edit_user/
// @access  private
export const editUser = asyncHandler(async (req, res) => {
  try {
    const { userId, name, email, city, country, phone } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (email) {
      const userExist = await User.findOne({ email });
      if (userExist && userExist._id.toString() !== userId) {
        return res
          .status(400)
          .json({ message: "Email already associated with another account." });
      }
    }

    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (city) updateFields.city = city;
    if (country) updateFields.country = country;
    if (phone) updateFields.phoneNumber = phone;

    await User.findByIdAndUpdate(userId, updateFields, { new: true });
    res.status(200).json({ message: "updated successfully" });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Server error while updating user" });
  }
});

// @desc    Update password
// @route   PATCH /api/user/update_password/
// @access  private
export const updatePassword = asyncHandler(async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword, userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid current password" });
    }

    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "New password and confirm password do not match" });
    }

    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Error updating password:", err);
    res.status(500).json({ message: "Server error while updating password" });
  }
});

// @desc    monitering user
// @route   GET /api/user/monitering_user/:id
// @access  public
export const moniteringUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  if (user.isBlocked) {
    return res.status(400).json({
      message: "User is Blocked",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isAdmin: user.isAdmin,
        isVerified: user.isVerified,
        city: user.city,
        country: user.country,
        phone: user.phone,
        isBlocked: user.isBlocked,
        addresses: user.addresses || null,
        token: generateTokens(user._id),
      },
    });
  } else {
    return res.status(200).json({
      message: "User is Not blocked",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isAdmin: user.isAdmin,
        isVerified: user.isVerified,
        city: user.city,
        country: user.country,
        phone: user.phone,
        isBlocked: user.isBlocked,
        addresses: user.addresses || null,
        token: generateTokens(user._id),
      },
    });
  }
});
