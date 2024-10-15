import express from "express"
import { login, userRegistration } from "../controllers/userController.js"

const router = express.Router()

// routes
router.post("/register", userRegistration)
router.post("/login", login)

export default router