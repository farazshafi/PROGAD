import express from "express";
import {
  createProduct,
  getAllProduct,
  getProductDetails,
  handlePublicChange,
} from "../controllers/productController.js";
import multer from "multer";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/create_product",
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "variantImages", maxCount: 10 },
  ]),
  createProduct
);

router.get("/get_products", getAllProduct);
router.patch("/handle_public_change/:id", handlePublicChange);
router.get("/product_details/:id", getProductDetails);

export default router;
