import { Request, Response } from 'express';
import createError from 'http-errors';
import categoriesService from '../services/categories.service';
import { sendJsonSuccess } from '../helpers/response.helper';
import { Types } from 'mongoose';

/**
 * Controller:
 * - Nhận đầu vào từ router
 * - Nhận kết quả từ service tương ứng với đầu vào
 * - Response kết quả cho client
 * - Không nên xử lý nghiệp vụ ở controller
 */

const getAll = async (req: Request, res: Response) => {
    const categories = await categoriesService.getAll();
    sendJsonSuccess(res, categories);
}

const getById = async (req: Request, res: Response) => {
    const {id} = req.params;
    const category = await categoriesService.getById(id);
    sendJsonSuccess(res, category);
}

const create = async (req: Request, res: Response) => {
    const payload = req.body;
    const category = await categoriesService.create(payload);
    sendJsonSuccess(res, category);
}

const updateByID = async (req: Request, res: Response) => {
    const {id} = req.params;
    const payload = req.body;
    const result = await categoriesService.updateById(Number(id), payload);
    sendJsonSuccess(res, result);
}

const deleteById = async (req: Request, res: Response) => {
    const {id} = req.params;
    const category = await categoriesService.deleteById(Number(id));
    sendJsonSuccess(res, category);
}

export default {
    getAll,
    getById,
    create,
    updateByID,
    deleteById
}

