import express from "express"
import { blockUnblockUser, getUsers } from "../controllers/adminController.js"

const router = express.Router()

router.get("/get_users",getUsers)
router.patch("/block_unblock_user/:id",blockUnblockUser) 

export default router