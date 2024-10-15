import express from "express"
import { getUsers } from "../controllers/adminController.js"

const router = express.Router()

router.get("/get_users",getUsers)

export default router