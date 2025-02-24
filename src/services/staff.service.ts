import Staff from '../models/staff.model';

class StaffService {
    async getAll() {
        return await Staff.find().select('-password');
    }

    async getById(id: string) {
        return await Staff.findById(id).select('-password');
    }

    async create(data: any) {
        const staff = new Staff(data);
        return await staff.save();
    }

    async updateById(id: string, data: any) {
        return await Staff.findByIdAndUpdate(id, data, { new: true }).select('-password');
    }

    async deleteById(id: string) {
        return await Staff.findByIdAndDelete(id);
    }
}

export default new StaffService();