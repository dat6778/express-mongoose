import { Request, Response } from 'express';
import staffService from '../services/staff.service';
import { httpStatus, sendJsonSuccess } from '../helpers/response.helper';

class StaffController {
    async getAll(req: Request, res: Response) {
        try {
            const staffMembers = await staffService.getAll();
            sendJsonSuccess(res, staffMembers);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const staff = await staffService.getById(req.params.id);
            if (!staff) {
                return res.status(404).json({ message: 'Staff member not found' });
            }
            sendJsonSuccess(res, staff);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }

    async create(req: Request, res: Response) {
        try {
            const staff = await staffService.create(req.body);
            sendJsonSuccess(res, staff, httpStatus.CREATED.statusCode);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(400).json({ message: 'An unknown error occurred' });
            }
        }
    }

    async updateById(req: Request, res: Response) {
        try {
            const staff = await staffService.updateById(req.params.id, req.body);
            if (!staff) {
                return res.status(404).json({ message: 'Staff member not found' });
            }
            sendJsonSuccess(res, staff);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(400).json({ message: 'An unknown error occurred' });
            }
        }
    }

    async deleteById(req: Request, res: Response) {
        try {
            const staff = await staffService.deleteById(req.params.id);
            if (!staff) {
                return res.status(404).json({ message: 'Staff member not found' });
            }
            sendJsonSuccess(res, { message: 'Staff member deleted successfully' });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }
}

export default new StaffController();