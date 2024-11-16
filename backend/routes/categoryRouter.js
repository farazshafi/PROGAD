import express from "express";
import {
  createCategory,
  deleteCategory,
  editCategory,
  getAllCategories,
  getPublishedCategories,
  getTopSellingCategories,
  publishAndUnpublish,
} from "../controllers/categoryController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/create_category", createCategory);
router.get("/get_categories", getAllCategories);
router.get("/get_published_categories", getPublishedCategories);
router.delete("/delete_category/:id", deleteCategory);
router.patch("/publish_unpublish/:id", publishAndUnpublish);
router.patch("/edit_category/:id", editCategory);
router.get("/top_selling", protect, admin, getTopSellingCategories);

export default router;
