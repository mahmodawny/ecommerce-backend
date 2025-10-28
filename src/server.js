import express from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source.js";

dotenv.config();

const app = express();
app.use(express.json());

// ✅ Connect to Database
AppDataSource.initialize()
  .then(() => {
    console.log("✅ Database connected");
  })
  .catch((error) => console.error("❌ Database connection failed:", error));

// ✅ Routes examples
app.get("/", (req, res) => {
  res.json({ message: "E-Commerce API is running 🚀" });
});

// TODO: import and use your routes here
// import productRoutes from "./routes/productRoutes.js";
// app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
