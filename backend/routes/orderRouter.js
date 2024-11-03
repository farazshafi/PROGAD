import express from "express"
import { makeOrder } from "../controllers/orderController.js"
import {protect} from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/make_order",protect,makeOrder)

export default router