import express from "express";
import { createAddress, getAllAddresses } from "../controllers/addessController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/user/:id/create_address", protect, createAddress);
router.get("/user/:id/all_addresses", protect, getAllAddresses);

export default router;
