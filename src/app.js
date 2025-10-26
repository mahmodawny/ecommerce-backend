import express from "express";
import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./src/database.sqlite",
  synchronize: true,
  entities: ["src/models/Product.js", "src/models/Category.js"],
});

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Database connected successfully!");
  })
  .catch((error) => console.log("❌ Database connection error:", error));

// routes
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API is running 🚀" });
});

export default app;
