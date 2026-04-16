import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';
import connectDB from './config/db.js';

// Models
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import Category from './models/categoryModel.js';
import Brand from './models/brandModel.js';
import Address from './models/addressModel.js';
import Coupon from './models/couponModel.js';
import Offer from './models/offerModel.js';
import Wallet from './models/walletModel.js';
import Wishlist from './models/wishlistModel.js';

dotenv.config();

const importData = async () => {
    try {
        await connectDB();

        // 1. Clear existing data
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        await Category.deleteMany();
        await Brand.deleteMany();
        await Address.deleteMany();
        await Coupon.deleteMany();
        await Offer.deleteMany();
        await Wallet.deleteMany();
        await Wishlist.deleteMany();

        console.log('Data Destroyed!');

        // Drop indexes to ensure sparse indexes from model are recreated correctly
        try {
            const collections = await mongoose.connection.db.listCollections({ name: 'users' }).toArray();
            if (collections.length > 0) {
                const indexes = await mongoose.connection.db.collection('users').indexes();
                const hasGoogleIndex = indexes.some(idx => idx.name === 'googleId_1');
                const hasFaceIndex = indexes.some(idx => idx.name === 'faceData_1');
                
                if (hasGoogleIndex) await mongoose.connection.db.collection('users').dropIndex('googleId_1');
                if (hasFaceIndex) await mongoose.connection.db.collection('users').dropIndex('faceData_1');
                console.log('Sparse Indexes Reset!');
            }
        } catch (err) {
            console.log('Note: Index reset skipped or not needed.');
        }

        // 2. Create Categories
        const categoriesData = [
            { name: 'Headphones', description: 'Experience pure sound with our premium range of headphones.', isPublished: true },
            { name: 'Speakers', description: 'Fill your room with high-fidelity audio.', isPublished: true },
            { name: 'Earbuds', description: 'True wireless freedom for your active lifestyle.', isPublished: true },
            { name: 'Accessories', description: 'Essential add-ons for your audio gear.', isPublished: true },
        ];
        const createdCategories = await Category.insertMany(categoriesData);

        // 3. Create Brands
        const brandsData = [
            { name: 'Sony', description: 'Innovation and quality in every sound.', isPublished: true },
            { name: 'Bose', description: 'Better sound through research.', isPublished: true },
            { name: 'JBL', description: 'Dare to listen.', isPublished: true },
            { name: 'Sennheiser', description: 'The pursuit of perfect sound.', isPublished: true },
        ];
        const createdBrands = await Brand.insertMany(brandsData);

        // 4. Create Users
        const users = [
            {
                name: 'Admin User',
                email: 'admin@example.com',
                password: 'password123',
                isAdmin: true,
                role: 'admin',
                isVerified: true,
            }
        ];

        for (let i = 0; i < 5; i++) {
            users.push({
                name: faker.person.fullName(),
                email: faker.internet.email().toLowerCase(),
                password: 'password123',
                isAdmin: false,
                role: 'customer',
                isVerified: true,
                phoneNumber: 9876543210 + i,
            });
        }
        
        // Use create to run pre-save hooks (for password hashing)
        const createdUsers = await User.create(users);

        // 5. Create Addresses
        const addresses = createdUsers.map(user => ({
            user: user._id,
            name: user.name,
            type: `Home-${user._id}`, // Unique type as per schema constraint
            street: faker.location.streetAddress(),
            apartment: faker.location.secondaryAddress(),
            city: faker.location.city(),
            state: faker.location.state(),
            zip: 123456,
            country: 'India',
            phoneNumber: 9876543210,
            address: faker.location.streetAddress(),
            default: true
        }));
        const createdAddresses = await Address.insertMany(addresses);

        // Update users with address IDs
        for (let i = 0; i < createdUsers.length; i++) {
            createdUsers[i].addresses.push(createdAddresses[i]._id);
            await createdUsers[i].save();
        }

        // 6. Create Products
        const products = [];
        for (let i = 0; i < 20; i++) {
            const category = createdCategories[faker.number.int({ min: 0, max: createdCategories.length - 1 })];
            const brand = createdBrands[faker.number.int({ min: 0, max: createdBrands.length - 1 })];
            const originalPrice = faker.number.int({ min: 2000, max: 20000 });
            const discountPrice = Math.floor(originalPrice * 0.8);

            // Use category-specific images if possible
            const imageCategory = category.name.toLowerCase().includes('headphone') ? 'headphones' : 
                                category.name.toLowerCase().includes('speaker') ? 'speaker' : 
                                category.name.toLowerCase().includes('earbud') ? 'earbuds' : 'technology';

            products.push({
                name: `${brand.name} ${faker.commerce.productAdjective()} ${category.name.slice(0, -1)}`,
                description: faker.commerce.productDescription(),
                originalPrice,
                discountPrice,
                images: [
                    faker.image.urlLoremFlickr({ width: 800, height: 800, category: imageCategory }),
                    faker.image.urlLoremFlickr({ width: 800, height: 800, category: imageCategory })
                ],
                totalStock: faker.number.int({ min: 10, max: 100 }),
                category: category._id,
                brand: brand._id,
                color: [faker.color.human()],
                material: 'Premium Plastic',
                isBluetoothSupported: true,
                batteryLife: '24 hours',
                bluetoothVersion: '5.2',
                bluetoothRange: '15m',
                chargingTime: '1.5 hours',
                noiseCancellation: true,
                dualPlayConnection: true,
                appControl: true,
                waterResistant: true,
                touchControl: true,
                multiDevice: true,
                isPublished: true,
                isFeatured: i < 4,
                isNewArrival: i > 15
            });
        }
        const createdProducts = await Product.insertMany(products);

        // 7. Create Orders
        const orders = [];
        for (let i = 0; i < 8; i++) {
            const user = createdUsers[faker.number.int({ min: 1, max: createdUsers.length - 1 })];
            const product = createdProducts[faker.number.int({ min: 0, max: createdProducts.length - 1 })];
            const address = createdAddresses.find(a => a.user.toString() === user._id.toString());

            orders.push({
                user: user._id,
                orderId: `ORD-${faker.string.alphanumeric(8).toUpperCase()}`,
                items: [{
                    id: product._id,
                    quantity: 1,
                    price: product.discountPrice,
                    subTotal: product.discountPrice
                }],
                status: 'delivered',
                totalPrice: product.discountPrice + 50, // subtotal + delivery
                subTotal: product.discountPrice,
                deliveryCost: 50,
                shippingAddress: address._id,
                paymentMethod: 'razorpay',
                paymentStatus: 'paid',
                orderDate: faker.date.past()
            });
        }
        await Order.insertMany(orders);

        console.log('Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error importing data: ${error.message}`);
        console.error(error.stack);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await connectDB();
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        await Category.deleteMany();
        await Brand.deleteMany();
        await Address.deleteMany();
        await Coupon.deleteMany();
        await Offer.deleteMany();
        await Wallet.deleteMany();
        await Wishlist.deleteMany();

        console.log('Data Destroyed Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error destroying data: ${error.message}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
