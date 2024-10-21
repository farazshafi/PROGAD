import express from "express";
import {
  createProduct,
  getAllProduct,
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

export default router;
