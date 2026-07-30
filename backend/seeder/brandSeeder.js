import mongoose from "mongoose";
import Brand from "../models/brandModel.js"
import dns from "node:dns";



const brands = [
  {
    name: "JBL",
    description:
      "Premium audio brand known for portable Bluetooth speakers, headphones, soundbars, and professional audio equipment.",
    isPublished: true,
  },
  {
    name: "Sony",
    description:
      "Global electronics brand offering high-quality wireless earbuds, headphones, speakers, and home audio systems.",
    isPublished: true,
  },
  {
    name: "Bose",
    description:
      "Leading audio brand specializing in premium noise-cancelling headphones, speakers, and immersive sound solutions.",
    isPublished: true,
  },
  {
    name: "Sennheiser",
    description:
      "German audio brand renowned for audiophile headphones, microphones, and professional sound equipment.",
    isPublished: true,
  },
  {
    name: "Anker Soundcore",
    description:
      "Popular consumer audio brand offering affordable wireless earbuds, headphones, and Bluetooth speakers.",
    isPublished: true,
  },
];

dns.setServers(["8.8.8.8", "1.1.1.1"]);


const seedBrands = async () => {
  try {
    await mongoose.connect("mongodb+srv://farazpachu777:Pachumongodb@cluster0.udcke.mongodb.net/progad?retryWrites=true&w=majority&appName=Cluster0");

    await Brand.deleteMany({});
    await Brand.insertMany(brands);

    console.log("✅ Brands seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding brands:", error);
    process.exit(1);
  }
};

seedBrands();