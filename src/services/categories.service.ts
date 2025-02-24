import createError from 'http-errors';
import Category from '../models/category.model';
import { ICategoryCreate } from '../types/model';

class CategoryService {
    async getAll() {
        return await Category.find();
    }

    async getById(id: string) {
        const category = await Category.findById(id);
        if (!category) {
            throw createError(404, 'Category not found');
        }
        return category;
    }

    async create(payload: ICategoryCreate) {
        const category = new Category(payload);
        return await category.save();
    }

    async updateById(id: string, payload: ICategoryCreate) {
        const category = await Category.findByIdAndUpdate(id, payload, { new: true });
        if (!category) {
            throw createError(404, 'Category not found');
        }
        return category;
    }

    async deleteById(id: string) {
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            throw createError(404, 'Category not found');
        }
        return category;
    }
}

export default new CategoryService();