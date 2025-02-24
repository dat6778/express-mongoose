import Staff from '../models/staff.model';
import createError from 'http-errors';

class StaffService {
    async getAll() {
        return await Staff.find().select('-password');
    }

    async getById(id: string) {
        const staff = await Staff.findById(id).select('-password');
        if (!staff) {
            throw createError(404, 'Staff not found');
        }
        return staff;
    }

    async create(data: any) {
        const staff = new Staff(data);
        return await staff.save();
    }

    async updateById(id: string, data: any) {
        if (data.password) {
            delete data.password;
        }
        const staff = await Staff.findByIdAndUpdate(id, data, { 
            new: true 
        }).select('-password');
        if (!staff) {
            throw createError(404, 'Staff not found');
        }
        return staff;
    }

    async deleteById(id: string) {
        const staff = await Staff.findByIdAndDelete(id);
        if (!staff) {
            throw createError(404, 'Staff not found');
        }
        return staff;
    }
}

export default new StaffService();