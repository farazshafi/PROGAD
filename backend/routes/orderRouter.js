import express from "express"
import { getAllOrders, getOrderDetails, makeOrder } from "../controllers/orderController.js"
import {protect} from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/make_order",protect,makeOrder)
router.get("/get_all_orders/userId/:id",protect,getAllOrders)
router.get("/get_order_details/:id",protect,getOrderDetails)

export default router