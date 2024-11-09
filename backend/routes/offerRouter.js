import express from "express"
import { createOffer, deleteOffer, getAllOffersAdmin } from "../controllers/offerController.js"
import { admin, protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/create_offer",protect,admin,createOffer)
router.get("/get_offers_admin",protect,admin,getAllOffersAdmin)
router.delete("/delete_offer/:id",protect,admin,deleteOffer)

export default router