import express from "express"
import { login, resendOtp, userRegistration, verifyOtp } from "../controllers/userController.js"
import {protect} from "../middleware/authMiddleware.js"

const router = express.Router()

// routes
router.post("/register", userRegistration)
router.post("/login", login)
router.post("/verify_otp", verifyOtp)
router.post("/resend_otp",protect, resendOtp)

export default router