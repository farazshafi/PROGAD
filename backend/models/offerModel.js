import mongoose from "mongoose";

const offerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  offerCode: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^[a-z0-9]{4,}$/, // 4 to 12 characters, lowercase alphanumeric
  },
  expirationDate: {
    type: Date,
    required: true,
    default: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
  },
  discountType: {
    type: String,
    required: true,
    enum: ["percentage", "fixed"],
  },
  discount: {
    type: Number,
    required: true,
  },
  applyToProducts: {
    type: Boolean,
    default: false,
  },
  productIds: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Product",
    required: function () {
      return this.applyToProducts === true;
    },
  },
  applyToCategories: {
    type: Boolean,
    default: false,
  },
  categoryIds: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Category",
    required: function () {
      return this.applyToCategories === true;
    },
  },
  status: {
    type: String,
    required: true,
    enum: ["active", "inactive"],
    default: "active",
  },
});

const Offer = mongoose.model("Offer", offerSchema);

export default Offer;
