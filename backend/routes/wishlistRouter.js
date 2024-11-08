import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { createWishlist, getAllWishlist } from "../controllers/wishlistController.js"

const router = express.Router()

router.post("/create_wishlist",protect,createWishlist)
router.post("/get_wishlist",protect,getAllWishlist)

export default router