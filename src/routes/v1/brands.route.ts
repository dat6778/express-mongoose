import express from "express";
import brandsController from "../../controllers/brands.controller";
const router = express.Router();

/**
 * Brands Resource Routes
 * Base Path: /api/v1/brands
 */

// Get all brands
router.get("/brands", brandsController.getAll);

// Get brand by ID
router.get("/brands/:id", brandsController.getById);

// Create new brand
router.post("/brands", brandsController.create);

// Update brand by ID
router.put("/brands/:id", brandsController.updateByID);

// Delete brand by ID
router.delete("/brands/:id", brandsController.deleteById);

export default router;
