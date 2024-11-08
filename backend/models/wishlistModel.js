import mongoose, { mongo } from "mongoose";

const wishlistSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Product",
    required: true,
    default: [],
  },

},{timestamps:true});

const Wishlist = mongoose.model("Wishlist",wishlistSchema)

export default Wishlist;
