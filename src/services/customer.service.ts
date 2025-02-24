import Customer from '../models/customer.model';

class CustomerService {
    async getAll() {
        return await Customer.find().select('-password');
    }

    async getById(id: string) {
        return await Customer.findById(id).select('-password');
    }

    async create(data: any) {
        const customer = new Customer(data);
        return await customer.save();
    }

    async updateById(id: string, data: any) {
        // Don't allow password updates through this method
        if (data.password) {
            delete data.password;
        }
        return await Customer.findByIdAndUpdate(id, data, { 
            new: true 
        }).select('-password');
    }

    async deleteById(id: string) {
        return await Customer.findByIdAndDelete(id);
    }

    // Additional methods for customer-specific operations
    async findByEmail(email: string) {
        return await Customer.findOne({ email }).select('-password');
    }

    async findByPhone(phone: string) {
        return await Customer.findOne({ phone }).select('-password');
    }
}

export default new CustomerService();