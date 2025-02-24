import express, { Request, Response, NextFunction } from "express";
import customerController from "../../controllers/customer.controller";
const router = express.Router();

router.get("/customers", (req: Request, res: Response, next: NextFunction) => {
    customerController.getAll(req, res).catch(next);
});

router.get("/customers/:id", (req: Request, res: Response, next: NextFunction) => {
    customerController.getById(req, res).catch(next);
});

router.post("/customers", (req: Request, res: Response, next: NextFunction) => {
    customerController.create(req, res).catch(next);
});

router.put("/customers/:id", (req: Request, res: Response, next: NextFunction) => {
    customerController.updateByID(req, res).catch(next);
});

router.delete("/customers/:id", (req: Request, res: Response, next: NextFunction) => {
    customerController.deleteById(req, res).catch(next);
});

export default router;