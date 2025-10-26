import express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

// إنشاء الاتصال بقاعدة البيانات
createConnection({
  type: "sqlite",
  database: "./src/database.sqlite",
  synchronize: true,
  entities: ["src/models/*.js"],
})
  .then(() => {
    console.log("✅ Database connected successfully!");
  })
  .catch((error) => console.log("❌ Database connection error:", error));

// الراوت الأساسي
app.get("/", (req, res) => {
  res.json({ message: "API is running 🚀" });
});

export default app;
