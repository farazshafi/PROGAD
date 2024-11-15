import express from "express"
import {createBrand, getAllBrands } from "../controllers/brandController.js"
import { admin, protect } from "../middleware/authMiddleware.js"

const router = express.Router()
router.post("/create_brand",protect,admin,createBrand)
router.get("/list_brands",protect,admin,getAllBrands)

export default router