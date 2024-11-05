import express from "express"
import { editUser, login, resendOtp, updatePassword, userRegistration, verifyOtp } from "../controllers/userController.js"
import {protect} from "../middleware/authMiddleware.js"

const router = express.Router()

// routes
router.post("/register", userRegistration)
router.post("/login", login)
router.post("/verify_otp", verifyOtp)
router.post("/resend_otp",protect, resendOtp)
router.patch("/edit_user",protect, editUser)
router.patch("/update_password",protect, updatePassword)

export default router