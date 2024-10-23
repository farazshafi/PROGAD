import express from "express"
import { adminLogin, blockUnblockUser, delteUser, getAllProducts, getUsers } from "../controllers/adminController.js"
import {admin,protect} from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/get_users",protect,admin,getUsers)
router.patch("/block_unblock_user/:id",protect,admin,blockUnblockUser) 
router.delete("/delete_user/:id",delteUser) 
router.get("/all_products",protect,admin,getAllProducts) 
router.post("/admin_login",adminLogin) 

export default router