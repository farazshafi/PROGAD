import asyncHandler from "express-async-handler";
import Coupon from "../models/couponModel.js";

// @desc    create new coupon
// @route   POST /api/coupon/create_coupon
// @access  private admin
export const createCoupon = asyncHandler(async (req, res) => {
  const {
    name,
    code,
    discount,
    expirationDate,
    limit,
    minPurchasePrice,
    status,
    categories,
    description,
  } = req.body;
  //   validation
  if (
    !name ||
    !code ||
    !discount ||
    !expirationDate ||
    !limit ||
    !minPurchasePrice ||
    !status ||
    categories.length < 1
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const existCoupon = await Coupon.findOne({code})
  if(existCoupon) {
    return res.status(400).json({ message: "Coupon code already exists" });
  }
  const newCoupon = await Coupon.create({
    name,
    code,
    discount,
    expirationDate,
    limit,
    minPurchasePrice,
    status,
    categories,
    description,
  });
  if (newCoupon) {
    res.status(201).json({ message: "Coupon created" });
  } else {
    res.status(400).json({ message: "Invalid coupon data" });
  }
});



// @desc    get all coupons
// @route   GET /api/coupon/get_coupons
// @access  private admin
export const getAllCoupons = asyncHandler(async (req, res) => {
  const coupons = await Coupon.find({})
  if(!coupons){
    return res.status(400).json({message: 'Coupons not found'})
  }
  res.status(200).json(coupons)
});