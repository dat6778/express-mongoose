import { Request, Response } from 'express';
import orderService from '../services/order.service';
import { httpStatus, sendJsonSuccess } from '../helpers/response.helper';

class OrderController {
    async getAll(req: Request, res: Response, next: unknown) {
        try {
            const orders = await orderService.getAll();
            sendJsonSuccess(res, orders);
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
            const order = await orderService.getById(req.params.id);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            sendJsonSuccess(res, order);
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
            const order = await orderService.create(req.body);
            sendJsonSuccess(res, order, httpStatus.CREATED.statusCode);
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
            const order = await orderService.updateById(req.params.id, req.body);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            sendJsonSuccess(res, order);
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
            const order = await orderService.deleteById(req.params.id);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            sendJsonSuccess(res, { message: 'Order deleted successfully' });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }

    // Order Items handlers
    async addOrderItem(req: Request, res: Response, next: unknown) {
        try {
            const order = await orderService.addOrderItem(req.params.id, req.body);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            sendJsonSuccess(res, order);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(400).json({ message: 'An unknown error occurred' });
            }
        }
    }

    async removeOrderItem(req: Request, res: Response, next: unknown) {
        try {
            const order = await orderService.removeOrderItem(req.params.id, req.params.itemId);
            if (!order) {
                return res.status(404).json({ message: 'Order or item not found' });
            }
            sendJsonSuccess(res, order);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(400).json({ message: 'An unknown error occurred' });
            }
        }
    }

    async updateOrderItem(req: Request, res: Response, next: unknown) {
        try {
            const order = await orderService.updateOrderItem(req.params.id, req.params.itemId, req.body);
            if (!order) {
                return res.status(404).json({ message: 'Order or item not found' });
            }
            sendJsonSuccess(res, order);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(400).json({ message: 'An unknown error occurred' });
            }
        }
    }
}

export default new OrderController();