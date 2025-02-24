import { Request, Response } from 'express';
import staffService from '../services/staff.service';
import { sendJsonSuccess } from '../helpers/response.helper';

const staffController = {
    getAll: async (req: Request, res: Response) => {
        const staff = await staffService.getAll();
        sendJsonSuccess(res, staff);
    },

    getById: async (req: Request, res: Response) => {
        const {id} = req.params;
        const staff = await staffService.getById(id);
        sendJsonSuccess(res, staff);
    },

    create: async (req: Request, res: Response) => {
        const payload = req.body;
        const staff = await staffService.create(payload);
        sendJsonSuccess(res, staff, 201);
    },

    updateByID: async (req: Request, res: Response) => {
        const {id} = req.params;
        const payload = req.body;
        const result = await staffService.updateById(id, payload);
        sendJsonSuccess(res, result);
    },

    deleteById: async (req: Request, res: Response) => {
        const {id} = req.params;
        const staff = await staffService.deleteById(id);
        sendJsonSuccess(res, staff);
    }
};

export default staffController;