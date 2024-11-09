import asyncHandler from "express-async-handler";
import Offer from "../models/offerModel.js";

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
