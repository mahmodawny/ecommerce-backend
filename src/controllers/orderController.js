import { AppDataSource } from "../app.js";
import { Order } from "../models/Order.js";

const orderRepository = AppDataSource.getRepository(Order);

export const createOrder = async (req, res) => {
  try {
    const { userId, products, totalAmount } = req.body;
    const order = orderRepository.create({ userId, products, totalAmount });
    await orderRepository.save(order);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await orderRepository.find({ relations: ["products"] });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await orderRepository.findOne({
      where: { id: req.params.id },
      relations: ["products"],
    });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await orderRepository.findOneBy({ id: req.params.id });
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await orderRepository.save(order);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const result = await orderRepository.delete(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};