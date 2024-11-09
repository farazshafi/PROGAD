import express from "express"
import {protect,admin} from "../middleware/authMiddleware.js"
import { createCoupon, getAllCoupons } from "../controllers/couponController.js"

const router = express.Router()

router.post("/create_coupon",protect,admin,createCoupon)
router.get("/get_coupon",protect,admin,getAllCoupons)

export default router