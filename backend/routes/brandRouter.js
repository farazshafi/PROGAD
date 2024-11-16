import express from "express"
import {createBrand, editBrand, getAllBrands, getAllPublicBrands, updateBrandStatus } from "../controllers/brandController.js"
import { admin, protect } from "../middleware/authMiddleware.js"

const router = express.Router()
router.post("/create_brand",protect,admin,createBrand)
router.get("/list_brands",protect,admin,getAllBrands)
router.patch("/edit_brand/:id",protect,admin,editBrand)
router.patch("/update_status/:id",protect,admin,updateBrandStatus)
router.get("/list_public_brands",getAllPublicBrands)

export default router