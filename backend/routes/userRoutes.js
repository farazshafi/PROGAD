import express from "express";
import {
  editUser,
  faceLogin,
  faceRegister,
  forgottPassword,
  login,
  moniteringUser,
  resendOtp,
  resetPassword,
  updatePassword,
  userRegistration,
  verifyOtp,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { getWalletDetails } from "../controllers/walletController.js";

const router = express.Router();

// routes
router.post("/register", userRegistration);
router.post("/login", login);
router.post("/verify_otp", verifyOtp);
router.post("/resend_otp", resendOtp);
router.patch("/edit_user", protect, editUser);
router.patch("/update_password", protect, updatePassword);
router.get("/wallet/:userId", protect, getWalletDetails);
router.get("/monitering_user/:id", moniteringUser);
router.get("/forgott_password", forgottPassword);
router.patch("/reset_password", resetPassword);
router.post("/face_register", faceRegister);
router.post("/face_login", faceLogin);

export default router;
