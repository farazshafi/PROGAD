import express from "express"
import { createCategory, deleteCategory, editCategory, getAllCategories, getPublishedCategories, publishAndUnpublish } from "../controllers/categoryController.js"

const router = express.Router()
router.post("/create_category",createCategory)
router.get("/get_categories",getAllCategories)
router.get("/get_published_categories",getPublishedCategories)
router.delete("/delete_category/:id",deleteCategory)
router.patch("/publish_unpublish/:id",publishAndUnpublish)
router.patch("/edit_category/:id",editCategory)

export default router