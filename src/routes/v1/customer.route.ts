import express, { Request, Response, NextFunction } from "express";
import customerController from "../../controllers/customer.controller";
const router = express.Router();

// Get All Customers
router.get("/", (req: Request, res: Response, next: NextFunction) => {
    customerController.getAll(req, res, next);
});

// Get Customer by Id
router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
    customerController.getById(req, res, next);
});

// Create Customer
router.post("/", (req: Request, res: Response, next: NextFunction) => {
    customerController.create(req, res, next);
});

// Update Customer
router.put("/:id", (req: Request, res: Response, next: NextFunction) => {
    customerController.updateById(req, res, next);
});

// Delete Customer
router.delete("/:id", (req: Request, res: Response, next: NextFunction) => {
    customerController.deleteById(req, res, next);
});

export default router;