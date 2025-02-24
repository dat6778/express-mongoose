import express, { Request, Response, NextFunction } from "express";
import staffController from "../../controllers/staff.controller";
const router = express.Router();

// Get All Staff
router.get("/", staffController.getAll);
// Get Staff by Id
router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
    staffController.getById(req, res);
});
// Create Staff
router.post("/", staffController.create);
// Update Staff
router.put("/:id", (req: Request, res: Response, next: NextFunction) => {
    staffController.updateById(req, res);
});
// Delete Staff
router.delete("/:id", (req: Request, res: Response, next: NextFunction) => {
    staffController.deleteById(req, res);
});

export default router;