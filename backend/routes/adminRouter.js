import express from "express"
import { blockUnblockUser, delteUser, getUsers } from "../controllers/adminController.js"

const router = express.Router()

router.get("/get_users",getUsers)
router.patch("/block_unblock_user/:id",blockUnblockUser) 
router.delete("/delete_user/:id",delteUser) 

export default router