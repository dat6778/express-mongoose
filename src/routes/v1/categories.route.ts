import express, { Request, Response } from "express";
import categoriesController from "../../controllers/categories.controller";
const router = express.Router();

/**
 * route để định tuyến
 *  path <==> controller 
 */

// Get All Categories
router.get("/categories", async (req: Request, res: Response) => {
    return await categoriesController.getAll(req, res);
});

// Get Category by Id
router.get("/categories/:id", async (req: Request<{ id: string }, any, any>, res: Response) => {
    return await categoriesController.getById(req, res);
});

// Create Category
router.post("/categories", async (req: Request, res: Response) => {
    return await categoriesController.create(req, res);
});

// Update Category
router.put("/categories/:id", async (req: Request, res: Response) => {
    return await categoriesController.updateByID(req, res);
});

// Delete Category
router.delete("/categories/:id", async (req: Request, res: Response) => {
    return await categoriesController.deleteById(req, res);
});

export default router;
