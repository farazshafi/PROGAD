import express from "express"
import {createBrand } from "../controllers/brandController.js"

const router = express.Router()
router.post("/create_brand",createBrand)

export default router