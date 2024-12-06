import asyncHandler from  "express-async-handler"
import Wallet from "../models/walletModel.js"


// @desc    get wallet details
// @route   GET /api/user/wallet/:userId
// @access  private
export const getWalletDetails = asyncHandler(async(req,res)=>{
    const {userId} = req.params

    const wallet = await Wallet.findOne({userId}).sort({"transactions.createdAt":-1}).select("balance _id transactions")

    if(!wallet){
        return res.status(201).json([])
    }

    wallet.transactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json(wallet)

})