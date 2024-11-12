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
  const existCoupon = await Coupon.findOne({ code });
  if (existCoupon) {
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
  const coupons = await Coupon.find({});
  if (!coupons) {
    return res.status(400).json({ message: "Coupons not found" });
  }
  res.status(200).json(coupons);
});

// @desc    delete coupon
// @route   Delete /api/coupon/delete_coupon/:id
// @access  private admin
export const deleteCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const coupons = await Coupon.findByIdAndDelete(id);
  if (coupons) {
    return res.status(200).json({ message: "Coupon Deleted" });
  } else {
    res.status(400).json({ message: "Coudn't Delete Coupon" });
  }
});

// @desc    Edit coupon
// @route   Patch /api/coupon/edit_coupon/:id
// @access  private admin
export const editCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, code, discount, minPurchasePrice } = req.body;
  if (discount > 70) {
    return res.status(400).json({ message: "Discount can't be more than 70%" });
  }
  const coupon = await Coupon.findById(id);
  if (!coupon) {
    return res.status(400).json({ message: "Coupon not found" });
  }
  coupon.status = status || coupon.status;
  coupon.code = code || coupon.code;
  coupon.discount = discount || coupon.discount;
  coupon.minPurchasePrice = minPurchasePrice || coupon.minPurchasePrice;
  await coupon.save();
  res.status(200).json({ message: "Coupon Updated" });
});

// @desc    get All Active Coupons
// @route   GET /api/coupon/active_coupons
// @access  public
export const getActiveCoupons = asyncHandler(async (req, res) => {
  const coupons = await Coupon.find({status: "active"}).select("name code discount expirationDate")
  if(!coupons){
    res.status(400).json({message: "No active Coupons found"})
  }
  res.status(200).json(coupons);
});
