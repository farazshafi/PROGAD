import express from "express"
import { createOffer, getAllOffersAdmin } from "../controllers/offerController.js"
import { admin, protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/create_offer",protect,admin,createOffer)
router.get("/get_offers_admin",protect,admin,getAllOffersAdmin)

export default router