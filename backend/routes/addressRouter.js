import express from "express";
import { createAddress, deleteAddress, editAddress, getAllAddresses } from "../controllers/addessController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/user/:id/create_address", protect, createAddress);
router.get("/user/:id/all_addresses", protect, getAllAddresses);
router.patch("/edit_address/:id", protect, editAddress);
router.delete("/delete_address/:id", protect, deleteAddress);

export default router;
