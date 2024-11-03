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
    name,
    address:homeAddress,
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
  if (name === undefined || name.trim() === "") {
    return res.status(400).json({ message: "name is required" });
  }
  if (homeAddress === undefined || homeAddress.trim() === "") {
    return res.status(400).json({ message: "address is required" });
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
    const user = await User.findById(id);
    if (user.addresses.length >= 4) {
      return res
        .status(400)
        .json({ message: "User can't have more than 4 addresses" });
    }

    const newAddress = await Address.create({
      user: id,
      type,
      street,
      apartment,
      city,
      state,
      zip,
      name,
      address:homeAddress,
      country,
      phoneNumber,
      email,
    });

    await User.findByIdAndUpdate(
      id,
      { $push: { addresses: newAddress._id } },
      { new: true }
    );
    res.status(201).json({ message: "Address created successfully" });
  } catch (err) {
    console.error("Error creating address:", err);
    return res
      .status(400)
      .json({ message: "Error creating address", error: err.message });
  }
});

// @desc    edit address
// @route   PATCH /api/address/edit_address/:id
// @access  private
export const editAddress = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    type,
    street,
    apartment,
    city,
    state,
    name,
    address:homeAddress,
    zip,
    country,
    phoneNumber,
    email,
  } = req.body;

  try {
    const address = await Address.findById(id);
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    address.type = type || address.type;
    address.street = street || address.street;
    address.apartment = apartment || address.apartment;
    address.city = city || address.city;
    address.state = state || address.state;
    address.zip = zip || address.zip;
    address.name = name || address.name;
    address.address = homeAddress || address.address;
    address.country = country || address.country;
    address.phoneNumber = phoneNumber || address.phoneNumber;
    address.email = email || address.email;

    await address.save();
    res.status(200).json({ message: "Address updated successfully" });
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

// @desc    delete address by id
// @route   DELETE /api/address/delete_address/:id
// @access  private
export const deleteAddress = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { addresses: id } },
      { new: true }
    );

    if(!user){
      return res.status(404).json({ message: "User not found" });
    }

    await Address.findByIdAndDelete(id);
    res.status(200).json({ message: "Address deleted" });
  } catch (err) {
    console.error("Error getting addresses:", err.message);
    res.status(500).json({ message: "Server error while getting addresses" });
  }
});
