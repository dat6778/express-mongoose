import { Request, Response } from 'express';
import customerService from '../services/customer.service';
import { httpStatus, sendJsonSuccess } from '../helpers/response.helper';

class CustomerController {
    async getAll(req: Request, res: Response, next: unknown) {
        try {
            const customers = await customerService.getAll();
            sendJsonSuccess(res, customers);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }

    async getById(req: Request, res: Response, next: unknown) {
        try {
            const customer = await customerService.getById(req.params.id);
            if (!customer) {
                return res.status(404).json({ message: 'Customer not found' });
            }
            sendJsonSuccess(res, customer);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }

    async create(req: Request, res: Response, next: unknown) {
        try {
            const customer = await customerService.create(req.body);
            sendJsonSuccess(res, customer, httpStatus.CREATED.statusCode);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(400).json({ message: 'An unknown error occurred' });
            }
        }
    }

    async updateById(req: Request, res: Response, next: unknown) {
        try {
            const customer = await customerService.updateById(req.params.id, req.body);
            if (!customer) {
                return res.status(404).json({ message: 'Customer not found' });
            }
            sendJsonSuccess(res, customer);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(400).json({ message: 'An unknown error occurred' });
            }
        }
    }

    async deleteById(req: Request, res: Response, next: unknown) {
        try {
            const customer = await customerService.deleteById(req.params.id);
            if (!customer) {
                return res.status(404).json({ message: 'Customer not found' });
            }
            sendJsonSuccess(res, { message: 'Customer deleted successfully' });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }
}

export default new CustomerController();