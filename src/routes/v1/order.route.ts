import express, { Request, Response, NextFunction } from "express";
import orderController from "../../controllers/order.controller";
const router = express.Router();

// Define route handlers with proper type checking
router.get("/orders", async (req: Request, res: Response, next: NextFunction) => {
    await orderController.getAll(req, res, next);
});

router.get("/orders/:id", async (req: Request, res: Response, next: NextFunction) => {
    await orderController.getById(req, res, next);
});

router.post("/orders", async (req: Request, res: Response, next: NextFunction) => {
    await orderController.create(req, res, next);
});

router.put("/orders/:id", async (req: Request, res: Response, next: NextFunction) => {
    await orderController.updateById(req, res, next);
});

router.delete("/orders/:id", async (req: Request, res: Response, next: NextFunction) => {
    await orderController.deleteById(req, res, next);
});

export default router;