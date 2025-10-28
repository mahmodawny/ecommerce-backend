import { AppDataSource } from "../app.js";
import { Order } from "../models/Order.js";
import { Product } from "../models/Product.js";

const orderRepo = AppDataSource.getRepository(Order);
const productRepo = AppDataSource.getRepository(Product);

// 🧾 إنشاء طلب جديد
export const createOrder = async (req, res) => {
  try {
    const { userId, productIds, totalAmount } = req.body;

    // ✅ جلب المنتجات المرتبطة بالطلب
    const products = await productRepo.findBy({
      id: AppDataSource.manager.getRepository(Product).metadata.connection.driver.escape(productIds),
    });

    // ✅ إنشاء الطلب
    const order = orderRepo.create({
      userId,
      products,
      totalAmount,
      status: "Pending",
    });

    await orderRepo.save(order);
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating order" });
  }
};

// 📦 جلب كل الطلبات
export const getOrders = async (req, res) => {
  try {
    const orders = await orderRepo.find({ relations: ["products"] });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching orders" });
  }
};

// 🔍 جلب طلب واحد بالتفصيل
export const getOrderById = async (req, res) => {
  try {
    const order = await orderRepo.findOne({
      where: { id: parseInt(req.params.id) },
      relations: ["products"],
    });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching order" });
  }
};

// 🧮 تحديث حالة الطلب (Admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await orderRepo.findOneBy({ id: parseInt(req.params.id) });
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await orderRepo.save(order);
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating order status" });
  }
};

// 🗑️ حذف طلب
export const deleteOrder = async (req, res) => {
  try {
    const result = await orderRepo.delete(parseInt(req.params.id));
    if (result.affected === 0)
      return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting order" });
  }
};