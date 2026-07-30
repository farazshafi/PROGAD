import "dotenv/config";
import mongoose from "mongoose";
import Category from "../models/categoryModel.js";
import dns from "node:dns";

const categories = [
  {
    name: "Earbuds",
    description: "True wireless and wired in-ear earphones for everyday listening and calls.",
    isPublished: true,
  },
  {
    name: "Headphones",
    description: "Over-ear and on-ear headphones for immersive music, gaming, and professional use.",
    isPublished: true,
  },
  {
    name: "Bluetooth Speakers",
    description: "Portable and home wireless speakers with Bluetooth connectivity.",
    isPublished: true,
  },
  {
    name: "Soundbars",
    description: "Home entertainment speakers designed to enhance TV and movie audio.",
    isPublished: true,
  },
  {
    name: "Smart Speakers",
    description: "Voice assistant-enabled speakers with smart home integration.",
    isPublished: true,
  },
  {
    name: "Neckbands",
    description: "Wireless neckband earphones offering comfort for all-day use.",
    isPublished: true,
  },
  {
    name: "Gaming Headsets",
    description: "Headsets with microphones optimized for gaming and voice communication.",
    isPublished: true,
  },
  {
    name: "Studio Headphones",
    description: "Professional-grade headphones for music production, recording, and mixing.",
    isPublished: true,
  },
  {
    name: "Wired Earphones",
    description: "Traditional wired earphones with 3.5mm or USB-C connectors.",
    isPublished: true,
  },
  {
    name: "Accessories",
    description: "Audio accessories including cables, adapters, ear tips, charging cases, and stands.",
    isPublished: true,
  },
];

dns.setServers(["8.8.8.8", "1.1.1.1"]);


const seedCategories = async () => {
  try {
    await mongoose.connect("mongodb+srv://farazpachu777:Pachumongodb@cluster0.udcke.mongodb.net/progad?retryWrites=true&w=majority&appName=Cluster0");

    await Category.deleteMany({});
    await Category.insertMany(categories);

    console.log("✅ Categories seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding categories:", error);
    process.exit(1);
  }
};

seedCategories();