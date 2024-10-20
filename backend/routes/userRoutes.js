import express from "express"
import { login, userRegistration, verifyOtp } from "../controllers/userController.js"

const router = express.Router()

// routes
router.post("/register", userRegistration)
router.post("/login", login)
router.post("/verify_otp", verifyOtp)

export default router