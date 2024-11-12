import express from "express"
import {protect,admin} from "../middleware/authMiddleware.js"
import { createCoupon, deleteCoupon, editCoupon, findCoupon, getActiveCoupons, getAllCoupons } from "../controllers/couponController.js"

const router = express.Router()

router.post("/create_coupon",protect,admin,createCoupon)
router.get("/get_coupon",protect,admin,getAllCoupons)
router.delete("/delete_coupon/:id",protect,admin,deleteCoupon)
router.patch("/edit_coupon/:id",protect,admin,editCoupon)
router.get("/active_coupon",getActiveCoupons)
router.get("/find_coupon/:code",findCoupon)

export default router