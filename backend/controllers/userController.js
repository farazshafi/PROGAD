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

// Computes cosine similarity between two arrays of numbers.
const cosineSimilarity = (vecA, vecB) => {
  const dotProduct = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
  return dotProduct / (magnitudeA * magnitudeB);
};

// @desc    Register a new user or sign in with Google
// @route   POST /api/user/register
// @access  public
export const userRegistration = asyncHandler(async (req, res) => {
  const { name, email, password, phoneNumber, googleId, faceData } = req.body;

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
  console.log("otp :", otp);

  user = await User.create({
    email,
    name,
    password,
    phoneNumber,
    faceData: faceData ? faceData : null,
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
        faceData: null,
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

// @desc    Register a new user With Face
// @route   POST /api/user/register_face
// @access  public
export const faceRegister = asyncHandler(async (req, res) => {
  const { faceData, email } = req.body;

  // Find the user by email
  const userExist = await User.findOne({ email });
  if (!userExist) {
    return res.status(400).json({ message: "User not found" });
  }

  // Prevent duplicate registration for the same user
  if (userExist.faceData) {
    return res
      .status(400)
      .json({ message: "User already registered with face" });
  }

  // Convert incoming faceData object to an array for similarity computation.
  const inputFaceArray = Object.keys(faceData)
    .sort((a, b) => a - b)
    .map((key) => faceData[key]);

  // Define a helper function for cosine similarity.
  const cosineSimilarity = (vecA, vecB) => {
    const dotProduct = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  };

  // Retrieve all users with faceData registered.
  const usersWithFaceData = await User.find({
    faceData: { $exists: true, $ne: null },
  });

  const threshold = 0.95; // Set your similarity threshold (adjust as needed)

  // Loop through existing users to check for similar face data.
  for (const existingUser of usersWithFaceData) {
    let storedFaceData = existingUser.faceData;
    let storedFaceArray;

    // If the stored data is already an array, use it; otherwise, convert from object.
    if (Array.isArray(storedFaceData)) {
      storedFaceArray = storedFaceData;
    } else {
      storedFaceArray = Object.keys(storedFaceData)
        .sort((a, b) => a - b)
        .map((key) => storedFaceData[key]);
    }

    // Ensure both embeddings have the same length.
    if (storedFaceArray.length !== inputFaceArray.length) continue;

    const similarity = cosineSimilarity(inputFaceArray, storedFaceArray);
    if (similarity >= threshold) {
      return res.status(400).json({
        message: "Face data similar to an existing user. Registration denied.",
      });
    }
  }

  // If no similar face data is found, save the new face data.
  // (You can store as the original object, or optionally store as an array)
  userExist.faceData = faceData;
  await userExist.save();

  res.status(200).json({
    success: true,
    message: "Face registered successfully!",
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
    console.log("otp", otp);
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

// @desc    User validation with face
// @route   POST /api/user/face_login
// @access  Public
export const faceLogin = asyncHandler(async (req, res) => {
  const { faceData } = req.body;

  if (!faceData) {
    return res.status(400).json({ message: "Face data is required" });
  }

  // Convert incoming faceData (object) to an array.
  // Sorting keys numerically ensures consistent ordering.
  const inputFaceArray = Object.keys(faceData)
    .sort((a, b) => a - b)
    .map((key) => faceData[key]);

  const users = await User.find({ faceData: { $exists: true, $ne: null } });

  let matchedUser = null;
  let highestSimilarity = 0.0;
  const threshold = 0.95; // Adjust this threshold based on your testing

  for (const user of users) {
    // Convert the stored faceData object into an array.
    const storedFaceData = user.faceData;
    const storedFaceArray = Object.keys(storedFaceData)
      .sort((a, b) => a - b)
      .map((key) => storedFaceData[key]);

    if (storedFaceArray.length !== inputFaceArray.length) continue;

    // Compute similarity
    const similarity = cosineSimilarity(inputFaceArray, storedFaceArray);

    if (similarity > highestSimilarity && similarity >= threshold) {
      highestSimilarity = similarity;
      matchedUser = user;
    }
  }

  if (!matchedUser) {
    return res.status(400).json({ message: "Face not registed" });
  }

  if (matchedUser.isBlocked) {
    return res.status(403).json({ message: "User is blocked! Access denied" });
  }

  res.status(200).json({
    message: "Login successful",
    user: {
      _id: matchedUser._id,
      name: matchedUser.name,
      email: matchedUser.email,
      role: matchedUser.role,
      isAdmin: matchedUser.isAdmin,
      isVerified: matchedUser.isVerified,
      faceData: true,
      city: matchedUser.city,
      country: matchedUser.country,
      phone: matchedUser.phone,
      isBlocked: matchedUser.isBlocked,
      token: generateTokens(matchedUser._id),
    },
  });
  console.log("response sended")
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
  if (userExist.isBlocked) {
    return res
      .status(400)
      .json({ message: "User is Blocked! , Not Allowed to Continue" });
  }
  // if (userExist.isVerified) {
  //   return res.status(400).json({ message: "User already verified" });
  // }
  const otp = generateOTP();
  console.log("otp:", otp);
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

// @desc    Reset password
// @route   GET /api/user/forgott_password?email=...
// @access  public
export const forgottPassword = asyncHandler(async (req, res) => {
  const { email } = req.query;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  if (user.isBlocked) {
    return res
      .status(400)
      .json({ message: "User is Blocked!, Not Allowed to continued" });
  }
  const otp = generateOTP();
  user.otp = otp;
  console.log("otp : ", otp);
  await user.save();
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP for Reset Password",
    text: `Your OTP for Reset Password is ${otp}`,
  };
  try {
    await transporter.sendMail(mailOptions);
    setTimeout(async () => {
      await User.findByIdAndUpdate(user._id, { $unset: { otp: "" } });
    }, 1 * 60 * 1000);

    res.status(200).json({ message: "OTP resent successfully" });
  } catch (err) {
    console.error("Error sending OTP:", err);
    res.status(400).json({ message: "Error sending OTP", error: err.message });
  }
});

// @desc    Reset password
// @route   PATCH /api/user/reset_password/
// @access  private
export const resetPassword = asyncHandler(async (req, res) => {
  try {
    const { newPassword, confirmPassword, email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const passwordRegex =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[^\s])[A-Za-z\d!@#$%^&*]{6,25}$/;

    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        message:
          "Password must be 6-25 characters, contain at least one number, one special character, and no whitespace.",
      });
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
