import Brand from "../models/brand.model";

class BrandService {
    async getAll() {
        return await Brand.find();
    }

    async getById(id: string) {
        return await Brand.findById(id);
    }

    async create(data: any) {
        const brand = new Brand(data);
        return await brand.save();
    }

    async updateById(id: string, data: any) {
        return await Brand.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteById(id: string) {
        return await Brand.findByIdAndDelete(id);
    }
}

export default new BrandService();