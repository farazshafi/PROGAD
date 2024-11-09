import express from "express"
import {protect,admin} from "../middleware/authMiddleware.js"
import { createCoupon, deleteCoupon, editCoupon, getAllCoupons } from "../controllers/couponController.js"

const router = express.Router()

router.post("/create_coupon",protect,admin,createCoupon)
router.get("/get_coupon",protect,admin,getAllCoupons)
router.delete("/delete_coupon/:id",protect,admin,deleteCoupon)
router.patch("/edit_coupon/:id",protect,admin,editCoupon)

export default router