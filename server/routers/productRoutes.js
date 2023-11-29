import express from "express";
import { isAdmin, userVerify } from "../middleware/auth.middleware.js";
import { createProduct } from "../controllers/productController.js";

const router = express.Router();

router.post("/create-product", userVerify, isAdmin, createProduct);

export default router;
