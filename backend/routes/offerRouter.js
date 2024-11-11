import express from "express"
import { createOffer, deleteOffer, editOffer, getActiveOffer, getAllOffersAdmin, offerProducts } from "../controllers/offerController.js"
import { admin, protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/create_offer",protect,admin,createOffer)
router.get("/get_offers_admin",protect,admin,getAllOffersAdmin)
router.delete("/delete_offer/:id",protect,admin,deleteOffer)
router.patch("/edit_offer/:id",protect,admin,editOffer)
router.get("/active_offer",getActiveOffer)
router.get("/offer_products",offerProducts)

export default router