import Brand from '../models/brand.model';
import Customer from '../models/customer.model';
import Staff from '../models/staff.model';

const seedData = async () => {
    // Sample Brands
    const brands = [
        { brandName: 'Trek', description: 'High-quality bikes for all terrains' },
        { brandName: 'Giant', description: 'Specializing in road and mountain bikes' },
        { brandName: 'Specialized', description: 'Innovative designs for cycling enthusiasts' },
        { brandName: 'Cannondale', description: 'Known for its performance-oriented bicycles' },
        { brandName: 'Scott', description: 'Offers a wide range of bicycles for various purposes' }
    ];

    // Sample Customers
    const customers = [
        {
            firstName: 'John',
            lastName: 'Doe',
            phone: '123-456-7890',
            email: 'john.doe@example.com',
            street: '123 Main St',
            city: 'Anytown',
            state: 'CA',
            zipCode: '12345',
            password: 'password123'
        },
        // Add more customers as needed
    ];

    // Sample Staff
    const staffMembers = [
        {
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@bikestore.com',
            phone: '999-888-7777',
            password: 'admin123'
        },
        // Add more staff as needed
    ];

    try {
        await Brand.insertMany(brands);
        await Customer.insertMany(customers);
        await Staff.insertMany(staffMembers);
        console.log('Sample data inserted successfully');
    } catch (error) {
        console.error('Error seeding data:', error);
    }
};

export default seedData;