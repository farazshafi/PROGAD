import Category from "../models/categoryModel.js";
import asyncHandler from "express-async-handler";

// @desc    creates a new category
// @route   POST /api/category/create_category
// @access  private admin
export const createCategory = asyncHandler(async (req, res) => {
  const { name, description, isPublished } = req.body;
  const categoryExist = await Category.findOne({ name });
  if (categoryExist) {
    return res.status(400).json({ message: "Category already exists" });
  }
  const category = await Category.create({ name, description, isPublished });
  if (Category) {
    res.status(201).json({ category });
  }
});


// @desc    get all categories
// @route   GET /api/category/get_categories
// @access  private admin
export const getAllCategories = asyncHandler(async (req, res) => {
  const category = await Category.find();
  if (category) {
    res.status(200).json(category);
  } else {
    res.status(404).json({ message: "No categories found" });
  }
});


// @desc    delete category by id
// @route   GET /api/category/delete_category/:id
// @access  private admin
export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Category.findByIdAndDelete(id);
  res.status(200).json({ message: "Category deleted successfully" });
});


// @desc    publish and unpublish categories
// @route   PATCH /api/category/publish_unpublish/:id
// @access  private admin
export const publishAndUnpublish = asyncHandler(async (req, res) => {
    const {id} = req.params
    const {isPublished} = req.body
    const updatedCategory = await Category.findByIdAndUpdate(
        id,
        { isPublished },
        { new: true }
    )
    if(updatedCategory){
        res.status(200).json({category: updatedCategory})
    }else{
        res.status(404).json({message: "Category not found"})
    }
});


// @desc    edit category
// @route   PATCH /api/category/edit_category/:id
// @access  private admin
export const editCategory = asyncHandler(async (req, res) => {
    const {id} = req.params
    const {name,description,isPublished} = req.body
    const updatedCategory = await Category.findByIdAndUpdate(
        id,
        { name, description,isPublished },
        { new: true }
    )
    if(updatedCategory){
        res.status(200).json(updatedCategory)
    }else{
        res.status(404).json({message: "Category not found"})
    }
});
