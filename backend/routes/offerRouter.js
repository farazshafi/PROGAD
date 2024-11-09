import express from "express"
import { createOffer } from "../controllers/offerController.js"
import { admin, protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/create_offer",protect,admin,createOffer)

export default router