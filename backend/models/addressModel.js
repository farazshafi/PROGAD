import mongoose, { mongo } from "mongoose";

const addressSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    unique: true,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  apartment: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
  },
  default:{
    type: Boolean,
    default: false,
  }
},{timestapms:true});

const Address = mongoose.model("Address", addressSchema);

export default Address;
