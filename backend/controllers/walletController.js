import asyncHandler from  "express-async-handler"
import Wallet from "../models/walletModel.js"


// @desc    get wallet details
// @route   GET /api/user/wallet/:userId
// @access  private
export const getWalletDetails = asyncHandler(async(req,res)=>{
    const {userId} = req.params

    const wallet = await Wallet.findOne({userId}).select("balance _id transactions")
    if(!wallet){
        return res.status(404).json({message: "No wallet found"})
    }
    res.status(200).json(wallet)

})