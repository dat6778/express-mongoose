import Customer from '../models/customer.model';
import createError from 'http-errors';

class CustomerService {
    async getAll() {
        return await Customer.find().select('-password');
    }

    async getById(id: string) {
        const customer = await Customer.findById(id).select('-password');
        if (!customer) {
            throw createError(404, 'Customer not found');
        }
        return customer;
    }

    async create(data: any) {
        const customer = new Customer(data);
        return await customer.save();
    }

    async updateById(id: string, data: any) {
        if (data.password) {
            delete data.password;
        }
        const customer = await Customer.findByIdAndUpdate(id, data, { 
            new: true 
        }).select('-password');
        if (!customer) {
            throw createError(404, 'Customer not found');
        }
        return customer;
    }

    async deleteById(id: string) {
        const customer = await Customer.findByIdAndDelete(id);
        if (!customer) {
            throw createError(404, 'Customer not found');
        }
        return customer;
    }

    async findByEmail(email: string) {
        const customer = await Customer.findOne({ email }).select('-password');
        if (!customer) {
            throw createError(404, 'Customer not found');
        }
        return customer;
    }

    async findByPhone(phone: string) {
        const customer = await Customer.findOne({ phone }).select('-password');
        if (!customer) {
            throw createError(404, 'Customer not found');
        }
        return customer;
    }
}

export default new CustomerService();