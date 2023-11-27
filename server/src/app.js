import express from "express";
import "dotenv/config";
import morgan from "morgan";
import cors from "cors";
import connectDb from "../config/db.config.js";
import router from "../routers/auth.router.js";
import categoryRoutes from "../routers/categoryRoutes.js";

const app = express();

// middleware call

app.use(express.json());
app.use(morgan());
app.use(cors({ origin: "http://localhost:3000" }));

// router call
app.use("/api", router);
app.use("/api", categoryRoutes);

// call database
connectDb();

export default app;
