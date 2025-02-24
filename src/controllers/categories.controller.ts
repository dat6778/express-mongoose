import { Request, Response } from 'express';
import categoriesService from '../services/categories.service';
import { sendJsonSuccess } from '../helpers/response.helper';

const categoriesController = {
    getAll: async (req: Request, res: Response) => {
        const categories = await categoriesService.getAll();
        sendJsonSuccess(res, categories);
    },

    getById: async (req: Request, res: Response) => {
        const {id} = req.params;
        const category = await categoriesService.getById(id);
        sendJsonSuccess(res, category);
    },

    create: async (req: Request, res: Response) => {
        const payload = req.body;
        const category = await categoriesService.create(payload);
        sendJsonSuccess(res, category, 201);
    },

    updateByID: async (req: Request, res: Response) => {
        const {id} = req.params;
        const payload = req.body;
        const result = await categoriesService.updateById(id, payload);
        sendJsonSuccess(res, result);
    },

    deleteById: async (req: Request, res: Response) => {
        const {id} = req.params;
        const category = await categoriesService.deleteById(id);
        sendJsonSuccess(res, category);
    }
};

export default categoriesController;

export function getAll(arg0: string, getAll: any) {
    throw new Error("Function not implemented.");
}
export function getById(arg0: string, getById: any) {
    throw new Error("Function not implemented.");
}

export function create(arg0: string, create: any) {
    throw new Error("Function not implemented.");
}

export function updateByID(arg0: string, updateByID: any) {
    throw new Error("Function not implemented.");
}

export function deleteById(arg0: string, deleteById: any) {
    throw new Error("Function not implemented.");
}

