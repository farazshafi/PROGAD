import express from "express"
import {createBrand, editBrand, getAllBrands, updateBrandStatus } from "../controllers/brandController.js"
import { admin, protect } from "../middleware/authMiddleware.js"

const router = express.Router()
router.post("/create_brand",protect,admin,createBrand)
router.get("/list_brands",protect,admin,getAllBrands)
router.patch("/edit_brand/:id",protect,admin,editBrand)
router.patch("/update_status/:id",protect,admin,updateBrandStatus)

export default router