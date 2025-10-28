import { AppDataSource } from "../app.js";
import { Cart } from "../models/Cart.js";
import { Product } from "../models/Product.js";

const cartRepo = AppDataSource.getRepository(Cart);
const productRepo = AppDataSource.getRepository(Product);

// 🛒 إنشاء كارت جديد
export const createCart = async (req, res) => {
  try {
    const { userId, productIds } = req.body;

    const products = await productRepo.findByIds(productIds);
    const totalPrice = products.reduce((sum, p) => sum + Number(p.price), 0);

    const cart = cartRepo.create({ userId, products, totalPrice });
    await cartRepo.save(cart);

    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error creating cart" });
  }
};

// 📦 عرض جميع الكارتات
export const getCarts = async (req, res) => {
  try {
    const carts = await cartRepo.find({ relations: ["products"] });
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching carts" });
  }
};

// 🧮 تحديث كارت
export const updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { productIds } = req.body;

    const cart = await cartRepo.findOne({ where: { id }, relations: ["products"] });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const products = await productRepo.findByIds(productIds);
    cart.products = products;
    cart.totalPrice = products.reduce((sum, p) => sum + Number(p.price), 0);

    await cartRepo.save(cart);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error updating cart" });
  }
};

// 🗑️ حذف كارت
export const deleteCart = async (req, res) => {
  try {
    const { id } = req.params;
    await cartRepo.delete(id);
    res.json({ message: "Cart deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting cart" });
  }
};
