import express from "express";
import { isAdmin, userVerify } from "../middleware/auth.middleware.js";
import { createCategoryController } from "../controllers/categoryController.js";

const router = express();

// router
router.post("/create-category", userVerify, isAdmin, createCategoryController);

export default router;
