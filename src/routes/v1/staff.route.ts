import express, { Request, Response, NextFunction } from "express";
import staffController from "../../controllers/staff.controller";
const router = express.Router();

router.get("/staff", staffController.getAll);
router.get("/staff/:id", staffController.getById);
router.post("/staff", staffController.create);
router.put("/staff/:id", staffController.updateByID);
router.delete("/staff/:id", staffController.deleteById);

export default router;