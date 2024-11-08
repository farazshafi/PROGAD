import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { createWishlist, deleteWishlistProduct, getAllWishlist } from "../controllers/wishlistController.js"

const router = express.Router()

router.post("/create_wishlist",protect,createWishlist)
router.get("/get_wishlist/:id",protect,getAllWishlist)
router.delete("/delete_product/",protect,deleteWishlistProduct)

export default router