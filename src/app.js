import express from "express";
import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./src/database.sqlite",
  synchronize: true,
  entities: [
    "src/models/Product.js",
    "src/models/Category.js",
    "src/models/User.js",
    "src/models/Cart.js",
    "src/models/CartItem.js",
    "src/models/Order.js"
  ],  
});

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Database connected successfully!");
  })
  .catch((error) => console.log("❌ Database connection error:", error));

// ✅ routes
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// ✅ test route
app.get("/", (req, res) => {
  res.json({ message: "API is running 🚀" });
});

export default app;
