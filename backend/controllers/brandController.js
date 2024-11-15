import asyncHandler from "express-async-handler";
import Brand from "../models/brandModel.js"


// @desc    creates a new brand
// @route   POST /api/brand/create_brand
// @access  private admin
export const createBrand = asyncHandler(async (req, res) => {
  try {
    const { name, description, isPublished } = req.body;
    console.log("Req.body :",req.body)
    const existBrand = await Brand.findOne({ name });
    if (existBrand) {
      return res.status(400).json({ message: "Brand already exists" });
    }
    const brand = await Brand.create({ name, description, isPublished });
    if (brand) {
      res.status(201).json({message:"Brand created successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while creating brand" });
  }
});
