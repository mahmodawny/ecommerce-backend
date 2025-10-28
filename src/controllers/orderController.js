import { AppDataSource } from "../app.js";
import { Order } from "../models/Order.js";

// 🛒 إنشاء أوردر
export const createOrder = async (req, res) => {
  try {
    const { userId, products, totalAmount } = req.body;
    const orderRepo = AppDataSource.getRepository(Order);

    const order = orderRepo.create({ userId, products, totalAmount });
    await orderRepo.save(order);

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📦 عرض كل الأوردرات
export const getOrders = async (req, res) => {
  try {
    const orderRepo = AppDataSource.getRepository(Order);
    const orders = await orderRepo.find({ relations: ["products"] });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔍 عرض أوردر محدد
export const getOrderById = async (req, res) => {
  try {
    const orderRepo = AppDataSource.getRepository(Order);
    const order = await orderRepo.findOne({
      where: { id: req.params.id },
      relations: ["products"],
    });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔄 تحديث حالة الأوردر
export const updateOrderStatus = async (req, res) => {
  try {
    const orderRepo = AppDataSource.getRepository(Order);
    const { status } = req.body;
    const order = await orderRepo.findOneBy({ id: req.params.id });
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await orderRepo.save(order);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🗑️ حذف أوردر
export const deleteOrder = async (req, res) => {
  try {
    const orderRepo = AppDataSource.getRepository(Order);
    const result = await orderRepo.delete(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
