import asyncHandler from "express-async-handler";
import Offer from "../models/offerModel.js";
import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js";

// @desc    create new offer
// @route   POST /api/offer/create_offer
// @access  private admin
export const createOffer = asyncHandler(async (req, res) => {
  const {
    name,
    offerCode,
    expirationDate,
    discountType,
    discount,
    applyToProducts,
    productIds,
    applyToCategories,
    categoryIds,
    status,
  } = req.body;
  console.log("req body bro. ", req.body);
  // validation
  if (
    !name ||
    !offerCode ||
    !expirationDate ||
    !discountType ||
    !discount ||
    applyToProducts === undefined ||
    applyToCategories === undefined ||
    !status
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (applyToCategories && categoryIds.length < 1) {
    return res
      .status(400)
      .json({ message: "Please select at least one category" });
  }
  if (applyToProducts && productIds.length < 1) {
    return res
      .status(400)
      .json({ message: "Please select at least one product" });
  }

  const existingOffer = await Offer.findOne({ offerCode });
  if (existingOffer) {
    return res.status(400).json({ message: "Offer code already exists" });
  }

  const offer = new Offer({
    name,
    offerCode,
    expirationDate,
    discountType,
    discount,
    applyToProducts,
    productIds: applyToProducts ? productIds : undefined,
    applyToCategories,
    categoryIds: applyToCategories ? categoryIds : undefined,
    status,
  });
  await offer.save();
  res.status(201).json({ message: "Offer Created" });
});

// @desc    get all offers
// @route   GET /api/offer/get_offers_admin
// @access  private admin
export const getAllOffersAdmin = asyncHandler(async (req, res) => {
  const existingOffer = await Offer.find();
  if (!existingOffer) {
    return res.status(404).json({ message: "No offers found" });
  }
  res.status(200).json(existingOffer);
});

// @desc    get all offers
// @route   Delete /api/offer/delete_offer/:id
// @access  private admin
export const deleteOffer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Offer.findByIdAndDelete(id);
  res.status(200).json({ message: "Offer deleted" });
});

// @desc    Edit offer
// @route   Patch /api/offer/edit_offer/:id
// @access  private admin
export const editOffer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, name, discount, discountType } = req.body;
  if (discountType === "percentage" && discount > 70) {
    return res.status(400).json({ message: "Discount can't be more than 70%" });
  }
  const offer = await Offer.findById(id);
  if (!offer) {
    return res.status(400).json({ message: "offer not found" });
  }

  if (status === "active") {
    await Offer.updateMany(
      { _id: { $ne: id } },
      { $set: { status: "inactive" } }
    );
  }

  let currentDate = new Date();
  if (offer.expirationDate && offer.expirationDate < currentDate) {
    return res.status(400).json({ message: "Offer has expired" });
  }

  offer.status = status || offer.status;
  offer.name = name || offer.name;
  offer.discount = discount || offer.discount;
  await offer.save();
  res.status(200).json({ message: "Offer Updated" });
});

// @desc    get active order
// @route   get /api/offer/active_offer
// @access  public
export const getActiveOffer = asyncHandler(async (req, res) => {
  const activeOffer = await Offer.findOne({ status: "active" })
    .select(
      "name discountType discount expirationDate applyToProducts applyToCategories categoryIds"
    )
    .populate("categoryIds", "name _id");
  res.status(200).json(activeOffer);
});

// @desc    Get products with active offers
// @route   GET /api/offer/offer_products
// @access  Public
export const offerProducts = asyncHandler(async (req, res) => {
  try {
    const offers = await Offer.find({
      status: "active",
      $or: [{ applyToProducts: true }, { applyToCategories: true }],
    });

    let productIds = new Set();
    let categoryIds = new Set();

    offers.forEach((offer) => {
      if (offer.applyToProducts) {
        offer.productIds.forEach((id) => productIds.add(id.toString()));
      }
      if (offer.applyToCategories) {
        offer.categoryIds.forEach((id) => categoryIds.add(id.toString()));
      }
    });

    const products = await Product.find({
      $or: [
        { _id: { $in: Array.from(productIds) } },
        { category: { $in: Array.from(categoryIds) } },
      ],
    });

    const filteredProducts = products.map((product) => {
      const relevantOffer = offers.find(
        (offer) =>
          (offer.applyToProducts && offer.productIds.includes(product._id)) ||
          (offer.applyToCategories &&
            offer.categoryIds.includes(product.category))
      );

      const discountPrice =
        relevantOffer && relevantOffer.discountType === "percentage"
          ? product.discountPrice * (1 - relevantOffer.discount / 100)
          : product.discountPrice;

      return {
        _id: product._id,
        name: product.name,
        image: product.images[0] || null,
        discountType: relevantOffer.discountType,
        discountOffer: relevantOffer ? relevantOffer.discount : null,
        discountPrice: Math.round(discountPrice),
        originalPrice: product.originalPrice,
      };
    });

    res.status(200).json(filteredProducts);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching products with offers",
      error: error.message,
    });
  }
});

