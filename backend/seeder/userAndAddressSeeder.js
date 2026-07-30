import dotenv from "dotenv";
import { faker } from "@faker-js/faker";
import dns from "node:dns";
import User from "../models/userModel.js";
import Address from "../models/addressModel.js";
import mongoose from "mongoose";

dotenv.config();
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const seedUsers = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://farazpachu777:Pachumongodb@cluster0.udcke.mongodb.net/progad?retryWrites=true&w=majority&appName=Cluster0",
    );

    const admin = await User.findOne({ email: "admin@gmail.com" });

    if (!admin) {
      await User.create({
        name: "Admin User",
        email: "admin@gmail.com",
        password: "admin@123",
        isAdmin: true,
        role: "admin",
        isVerified: true,
        phoneNumber: 9876543210,
        city: "Kasaragod",
        country: "India",
      });

      console.log("Admin created.");
    } else {
      console.log("Admin already exists.");
    }

    await Address.deleteMany({});
    await User.deleteMany({ isAdmin: false });

    console.log("Existing users and addresses removed.");
    const users = [];

    for (let i = 0; i < 20; i++) {
      users.push({
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        password: "password123",
        phoneNumber: Number(`98${faker.string.numeric(8)}`),
        role: "customer",
        isVerified: true,
        isBlocked: false,
        city: faker.location.city(),
        country: "India",
        googleId: faker.string.uuid(),
        faceData: {
          embeddingId: faker.string.uuid(),
        },
      });
    }

    const createdUsers = await User.create(users);

    const addresses = createdUsers.map((user, index) => ({
      user: user._id,
      name: user.name,
      type: `Home-${index + 1}`,
      street: faker.location.streetAddress(),
      apartment: faker.location.secondaryAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zip: Number(faker.location.zipCode("######")),
      country: "India",
      phoneNumber: user.phoneNumber,
      email: user.email,
      address: `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.state()}`,
      default: true,
    }));

    const createdAddresses = await Address.insertMany(addresses);

    for (let i = 0; i < createdUsers.length; i++) {
      createdUsers[i].addresses.push(createdAddresses[i]._id);
      await createdUsers[i].save();
    }

    console.log(`${createdUsers.length} users created.`);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedUsers();
