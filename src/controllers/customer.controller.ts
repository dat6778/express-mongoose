import { Request, Response } from 'express';
import customerService from '../services/customer.service';
import { sendJsonSuccess } from '../helpers/response.helper';
import mongoose from 'mongoose';

const customerController = {
    getAll: async (req: Request, res: Response) => {
        const customers = await customerService.getAll();
        sendJsonSuccess(res, customers);
    },

    getById: async (req: Request, res: Response) => {
        try {
            const {id} = req.params;
            
            // Validate ObjectId
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'Invalid ID format',
                    data: null
                });
            }

            const customer = await customerService.getById(id);
            if (!customer) {
                return res.status(404).json({
                    statusCode: 404,
                    message: 'Customer not found',
                    data: null
                });
            }
            sendJsonSuccess(res, customer);
        } catch (error) {
            res.status(500).json({
                statusCode: 500,
                message: 'Internal Server Error',
                data: null
            });
        }
    },

    create: async (req: Request, res: Response) => {
        const payload = req.body;
        const customer = await customerService.create(payload);
        sendJsonSuccess(res, customer, 201);
    },

    updateByID: async (req: Request, res: Response) => {
        const {id} = req.params;
        const payload = req.body;
        const result = await customerService.updateById(id, payload);
        sendJsonSuccess(res, result);
    },

    deleteById: async (req: Request, res: Response) => {
        const {id} = req.params;
        const customer = await customerService.deleteById(id);
        sendJsonSuccess(res, customer);
    }
};

export default customerController;