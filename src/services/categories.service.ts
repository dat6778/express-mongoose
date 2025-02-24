import createError from 'http-errors';
import categoryModel from '../models/category.model';
import { ICategoryCreate } from '../types/model';
import { ObjectId } from 'mongoose';
/**
 * Service
 * - Nhận đầu vào từ controller
 * - Xử lý logic
 * - Lấy dữ liệu return về controller
 */

const getAll = async()=>{
    const categories = await categoryModel.find();
    console.log('<<=== 🚀 categories ===>>',categories);
    return categories;
}

const getById = async(id: string)=>{
    //const category = categories.find(category => category.id == Number(id));
    const category = await categoryModel.findById(id)
    //Nếu không tìm thấy category thì trả về lỗi 404
    if(!category){
        //throw new Error('Category not found');
        throw createError(400, 'Category not found');
    }
    return category;
}

const create = async(payload: ICategoryCreate)=>{
    //Tạo category mới
    const category = new categoryModel(payload);
    //Lưu vào database
    await category.save();
    //Trả về item vừa được tạo
    return category;
}

const updateById = (id: number, payload: {id: number, name: string})=>{
const category = categoryModel.findById(id);
    if(!category){
        throw createError(400, 'Category not found');
    }
    // Remove this line as we're using MongoDB - no need to find index in array
return categoryModel.findByIdAndUpdate(id, payload, { new: true });
    //return item vừa được update
return category;
}

const deleteById = async (id: number)=>{
const category = await categoryModel.findById(id);
    if(!category){
        throw createError(400, 'Category not found');
    }
await categoryModel.findByIdAndDelete(id);
// Remove this line since we're using MongoDB - no need to splice an array
    //return item vừa được xóa
    return category;
};

export default {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}