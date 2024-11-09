import express from "express"
import {protect,admin} from "../middleware/authMiddleware.js"
import { createCoupon, deleteCoupon, getAllCoupons } from "../controllers/couponController.js"

const router = express.Router()

router.post("/create_coupon",protect,admin,createCoupon)
router.get("/get_coupon",protect,admin,getAllCoupons)
router.delete("/delete_coupon/:id",protect,admin,deleteCoupon)

export default router