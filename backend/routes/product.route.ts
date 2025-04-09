import { Router } from "express";
import {
  getProducts,
  getProductbyId,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductbyId);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
