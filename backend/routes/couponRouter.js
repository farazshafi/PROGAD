import express from "express"
import {protect,admin} from "../middleware/authMiddleware.js"
import { createCoupon } from "../controllers/couponController.js"

const router = express.Router()

router.post("/create_coupon",protect,admin,createCoupon)

export default router