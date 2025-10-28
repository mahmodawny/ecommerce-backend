import express from "express";
import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

import { Product } from "./models/Product.js";
import { Category } from "./models/Category.js";
import { User } from "./models/User.js";
import { Cart } from "./models/Cart.js";
import { CartItem } from "./models/CartItem.js";
import { Order } from "./models/Order.js";

import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

// ✅ Database connection
export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./src/database.sqlite",
  synchronize: true,
  entities: [Product, Category, User, Cart, CartItem, Order],
});

const app = express();
app.use(express.json());

// ✅ Initialize Database
AppDataSource.initialize()
  .then(() => console.log("✅ Database connected successfully!"))
  .catch((error) => console.log("❌ Database connection error:", error));

// ✅ Routes
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.json({ message: "API is running 🚀" });
});

export default app;