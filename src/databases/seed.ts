import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import {env} from "../helpers/env.helper"
import Brand from '../models/brand.model';
import Category from '../models/category.model';
import Product from '../models/product.model';
import Customer from '../models/customer.model';
import Staff from '../models/staff.model';
import Order from '../models/order.model';

//Step 1: Ket noi Database su dung mongoose
const mongooseDbOptions = {
    autoIndex: true, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
    
  };
  mongoose
    .connect(env.MONGODB_URI as string, mongooseDbOptions)
    .then(() => {
      console.log('Connected to MongoDB');
      //should listen app here
    })
    .catch((err) => {
      console.error('Failed to Connect to MongoDB', err);
    });
  
//step 2: Su dung cac model de ket noi den collection
const fakeData = async () => {
    try {
        // Clear existing data
        await Promise.all([
            Brand.deleteMany({}),
            Category.deleteMany({}),
            Staff.deleteMany({}),
            Customer.deleteMany({}),
            Product.deleteMany({}),
            Order.deleteMany({})
        ]);
        console.log('Cleared existing data');

        // 1. Create Brands
        console.log('Creating Brands...');
        for (let i = 1; i <= 5; i++) {
            const brand = new Brand({
                brandName: faker.company.name(),
                description: faker.company.catchPhrase(),
                slug: faker.helpers.slugify(faker.company.name())
            });
            await brand.save();
            console.log(`Create Brand ${i} successfully!`);
        }

        // 2. Create Categories
        console.log('Creating Categories...');
        const departments = new Set(); // Track unique department names
        const maxAttempts = 20; // Maximum attempts to get unique names

        for (let i = 1; i <= 5; i++) {
            let attempts = 0; // Reset attempts for each category
            let categoryCreated = false;
            
            while (attempts < maxAttempts && !categoryCreated) {
                const categoryName = faker.commerce.department();
                if (!departments.has(categoryName)) {
                    departments.add(categoryName);
                    const category = new Category({
                        category_name: categoryName,
                        description: faker.commerce.productDescription(),
                        slug: faker.helpers.slugify(categoryName)
                    });
                    await category.save();
                    console.log(`Create Category ${i} successfully!`);
                    categoryCreated = true;
                }
                attempts++;
            }
            
            if (!categoryCreated) {
                throw new Error('Could not generate enough unique category names');
            }
        }

        // Continue with other collections...
        console.log('Creating Staff...');
        for (let i = 1; i <= 5; i++) {
            const staff = new Staff({
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                email: faker.internet.email(),
                phone: faker.phone.number(),
                password: "password123",
                active: true
            });
            await staff.save();
            console.log(`Create Staff ${i} successfully!`);
        }

        // 4. Create Customers
        for (let i = 1; i <= 10; i++) {
            const customer = new Customer({
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                email: faker.internet.email(),
                phone: faker.phone.number(),
                street: faker.location.street(),
                city: faker.location.city(),
                state: faker.location.state(),
                zipCode: faker.number.int({ min: 10000, max: 99999 }).toString(), // Generate 5-digit zip code
                password: "password123"
            });
            await customer.save();
            console.log(`Create Customer ${i} successfully!`);
        }

        // Get data for relations
        const currentBrands = await Brand.find();
        const currentCategories = await Category.find();

        // 5. Create Products
        for (let i = 1; i <= 15; i++) {
            let productName = faker.commerce.productName();
            const brand = currentBrands[Math.floor(Math.random() * currentBrands.length)];
            const category = currentCategories[Math.floor(Math.random() * currentCategories.length)];
        
            const product = new Product({
                product_name: productName,      // Changed from productName
                price: faker.commerce.price({ min: 100, max: 1200 }),
                discount: faker.number.int({ min: 1, max: 50 }),
                category: category._id,
                brand_id: brand._id,           // Changed from brandId
                description: faker.commerce.productDescription(),
                model_year: faker.date.past().getFullYear(),  // Changed from modelYear
                stock: faker.number.int({ min: 1, max: 200 }),
                thumbnail: 'https://picsum.photos/400/400',
                slug: faker.helpers.slugify(productName)
            });
            await product.save();
            console.log(`Create Product ${i} successfully!`);
        }

        // Get customers and products for orders
        const customers = await Customer.find();
        const products = await Product.find();

        // 6. Create Orders
        for (let i = 1; i <= 20; i++) {
            const customer = customers[Math.floor(Math.random() * customers.length)];
            const numberOfItems = Math.floor(Math.random() * 4) + 1;
            
            const items = [];
            for (let j = 0; j < numberOfItems; j++) {
                const product = products[Math.floor(Math.random() * products.length)];
                items.push({
                    productId: product._id,
                    quantity: faker.number.int({ min: 1, max: 5 }),
                    price: product.price,
                    discount: product.discount
                });
            }

            const order = new Order({
                customerId: customer._id,
                orderStatus: faker.helpers.arrayElement(['Pending', 'Processing', 'Shipped', 'Delivered']),
                orderDate: faker.date.past(),
                requiredDate: faker.date.future(),
                shippedDate: faker.date.future(),
                items: items
            });
            await order.save();
            console.log(`Create Order ${i} successfully!`);
        }
    } catch (error) {
        console.error('Error in fakeData:', error);
        throw error;
    }
}

//chay
try {
  fakeData();
} catch (error) {
  console.log('<<=== 🚀 error ===>>',error);
}