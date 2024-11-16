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


// @desc    List all the brans 
// @route   GET /api/brand/list_brands
// @access  private admin
export const getAllBrands = asyncHandler(async (req, res) => {
  try {
    const brands = await Brand.find({}).select("name isPublished description _id")
    if(!brands){
      return res.status(404).json({ message: "Brands not found" });
    }
    res.status(200).json(brands)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while listing brand" });
  }
});


// @desc    Edit Brand 
// @route   GET /api/brand/edit_brand/:id
// @access  private admin
export const editBrand = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const {name, description, isPublished} = req.body

    const brand = await Brand.findById(id).select("name description isPublished _id")
    if(!brand){
      return res.status(404).json({ message: "Brands not found" });
    }

    brand.name = name || brand.name
    brand.description = description || brand.description
    brand.isPublished = isPublished || brand.isPublished
    await brand.save()

    res.status(200).json({message: "Updated Brand"})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while listing brand" });
  }
});



// @desc    update status of isPublished 
// @route   Patch /api/brand/update_status/:id
// @access  private admin
export const updateBrandStatus = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { isPublished } = req.body;

    if (typeof isPublished !== 'boolean') {
      return res.status(400).json({ message: "Invalid value for isPublished. It must be a boolean." });
    }

    const brand = await Brand.findByIdAndUpdate(id, { isPublished }, { new: true });
    
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.status(200).json({ message: "Brand updated successfully", brand });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while updating brand status" });
  }
});


// @desc    List all public brans 
// @route   GET /api/brand/list_public_brands
// @access  public
export const getAllPublicBrands = asyncHandler(async (req, res) => {
  try {
    const brands = await Brand.find({isPublished: true}).select("name isPublished description _id")
    if(!brands){
      return res.status(404).json({ message: "Brands not found" });
    }
    res.status(200).json(brands)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while listing brand" });
  }
});