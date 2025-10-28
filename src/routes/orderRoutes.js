import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/orderController.js";

const router = express.Router();

// 🧾 إنشاء طلب جديد
router.post("/", createOrder);

// 📦 عرض كل الطلبات
router.get("/", getOrders);

// 🔍 عرض تفاصيل طلب واحد
router.get("/:id", getOrderById);

// 🧮 تحديث حالة الطلب (Admin)
router.patch("/:id/status", updateOrderStatus);

// 🗑️ حذف طلب
router.delete("/:id", deleteOrder);

export default router;