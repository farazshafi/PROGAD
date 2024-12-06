import express from "express";
import {
  checkCartProductValid,
  createProduct,
  getAllProduct,
  getAllPublicProducts,
  getFilteredProducts,
  getProductDetails,
  getRelatedProduct,
  getTopSellingProduct,
  handlePublicChange,
  updateProduct,
} from "../controllers/productController.js";
import multer from "multer";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/create_product",
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "varinat", maxCount: 10 },
  ]),
  createProduct
);

router.get("/get_products", getAllProduct);
router.patch("/handle_public_change/:id", handlePublicChange);
router.get("/product_details/:id", getProductDetails);
router.put("/update_product/:id", updateProduct);
router.get("/related_product/:id", getRelatedProduct);
router.get("/public_products", protect, admin, getAllPublicProducts);
router.get("/filter_products", getFilteredProducts);
router.get("/best_selling",getTopSellingProduct);
router.post("/check_cart_products", protect, checkCartProductValid);

export default router;
