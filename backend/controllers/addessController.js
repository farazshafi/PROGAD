import asyncHandler from "express-async-handler";
import Address from "../models/addressModel.js";
import User from "../models/userModel.js";

// @desc    create new address
// @route   POST /api/address/user/:id/create_address/
// @access  private
export const createAddress = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    type,
    street,
    apartmentNumber: apartment,
    city,
    state,
    zipCode: zip,
    country,
    phone: phoneNumber,
    email,
  } = req.body;

  // validation
  if (type === undefined) {
    return res.status(400).json({ message: "Type of address is required" });
  }
  if (street === undefined || street.trim() === "") {
    return res.status(400).json({ message: "Street address is required" });
  }
  if (city === undefined || city.trim() === "") {
    return res.status(400).json({ message: "City is required" });
  }
  if (state === undefined || state.trim() === "") {
    return res.status(400).json({ message: "State is required" });
  }
  if (zip === undefined || zip.trim() === "") {
    return res.status(400).json({ message: "Zip code is required" });
  }
  if (country === undefined || country.trim() === "") {
    return res.status(400).json({ message: "Country is required" });
  }
  if (apartment === undefined || apartment.trim() === "") {
    return res.status(400).json({ message: "Apartment number is required" });
  }
  if (phoneNumber === undefined || phoneNumber.trim() === "") {
    return res.status(400).json({ message: "Phone number is required" });
  }

  try {
    const address = await Address.findOne({ type });
    if (address) {
      return res.status(400).json({ message: "Address type already exists" });
    }
    const user = await User.findById(id)
    if(user.addresses.length >= 4){
      return res.status(400).json({ message: "User can't have more than 4 addresses" });
    }

    const newAddress = await Address.create({
      user: id,
      type,
      street,
      apartment,
      city,
      state,
      zip,
      country,
      phoneNumber,
      email,
    });
    
    await User.findByIdAndUpdate(
      id,
      { $push: { addresses: newAddress._id } },
      { new: true }
    );
    res
      .status(201)
      .json({message: "Address created successfully" });
  } catch (err) {
    console.error("Error creating address:", err);
    return res
      .status(400)
      .json({ message: "Error creating address", error: err.message });
  }
});

// @desc    get all addresses
// @route   GET /api/address/all_addresses
// @access  private
export const getAllAddresses = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const address = await Address.find({ user: id });
    if (!address) {
      return res.status(404).json({ message: "No addresses found" });
    }
    res.status(200).json(address);
  } catch (err) {
    console.error("Error getting addresses:", err.message);
    res.status(500).json({ message: "Server error while getting addresses" });
  }
});
