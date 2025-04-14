import { Router } from "express";
import {
  getProducts,
  getProductbyId,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import auth from "../middlewares/auth.middleware.js";
import admin from "../middlewares/admin.middleware.js";

const router = Router();

// Public routes
router.get("/", getProducts);
router.get("/:id", getProductbyId);

// Admin-only routes (must be authenticated first)
router.post("/", auth, admin, createProduct);
router.put("/:id", auth, admin, updateProduct);
router.delete("/:id", auth, admin, deleteProduct);

export default router;
