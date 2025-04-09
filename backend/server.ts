import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import helmet from "helmet";
import morgan from "morgan";
import productRoutes from "./routes/product.route.js";
import serviceRoutes from "./routes/service.route.js";

const app = express();
dotenv.config();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/services", serviceRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});