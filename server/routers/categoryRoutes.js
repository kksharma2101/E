import express from "express";
import { isAdmin, userVerify } from "../middleware/auth.middleware.js";
import { createCategoryController } from "../controllers/categoryController.js";

const categoryRoute = express.Router();

// router
categoryRoute.post(
  "/create-category",
  userVerify,
  isAdmin,
  createCategoryController
);

export default categoryRoute;
