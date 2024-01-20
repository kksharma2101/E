import express from "express";
import "dotenv/config";
import morgan from "morgan";
import cors from "cors";
import connectDb from "../config/db.config.js";
import authRouter from "../routers/auth.router.js";
import categoryRouter from "../routers/categoryRoutes.js";
import productRouter from "../routers/productRoutes.js";

const app = express();

// middleware call

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// router call
app.use("/api", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);

app.use("/test", function (req, res) {
  res.send("server is live");
});
// call database
connectDb();

export default app;
