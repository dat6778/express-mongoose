import express, { Request, Response, NextFunction } from "express";
import orderController from "../../controllers/order.controller";
const router = express.Router();

// Get All Orders
router.get("/", (req: Request, res: Response, next: NextFunction) => {
    orderController.getAll(req, res, next);
});

// Get Order by Id
router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
    orderController.getById(req, res, next);
});

// Create Order
router.post("/", (req: Request, res: Response, next: NextFunction) => {
    orderController.create(req, res, next);
});

// Update Order
router.put("/:id", (req: Request, res: Response, next: NextFunction) => {
    orderController.updateById(req, res, next);
});

// Delete Order
router.delete("/:id", (req: Request, res: Response, next: NextFunction) => {
    orderController.deleteById(req, res, next);
});

// Order Items Routes
router.post("/:id/items", (req: Request, res: Response, next: NextFunction) => {
    orderController.addOrderItem(req, res, next);
});

router.put("/:id/items/:itemId", (req: Request, res: Response, next: NextFunction) => {
    orderController.updateOrderItem(req, res, next);
});

router.delete("/:id/items/:itemId", (req: Request, res: Response, next: NextFunction) => {
    orderController.removeOrderItem(req, res, next);
});

export default router;