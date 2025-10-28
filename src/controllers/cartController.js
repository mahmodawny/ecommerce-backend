import { AppDataSource } from "../app.js";
import { Cart } from "../models/Cart.js";
import { Product } from "../models/Product.js";

const cartRepo = AppDataSource.getRepository(Cart);
const productRepo = AppDataSource.getRepository(Product);

// 🛒 إضافة منتج إلى الكارت
export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // ✅ تحقق إن المنتج موجود
    const product = await productRepo.findOne({ where: { id: productId } });
    if (!product) return res.status(404).json({ error: "Product not found" });

    // ✅ إنشاء كارت جديد
    const cart = cartRepo.create({
      userId,
      product,
      quantity: quantity || 1,
    });

    await cartRepo.save(cart);
    res.status(201).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error adding to cart" });
  }
};

// 📦 عرض كل الكروت
export const getCarts = async (req, res) => {
  try {
    const carts = await cartRepo.find({ relations: ["product"] });
    res.json(carts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching carts" });
  }
};

// 🧮 تحديث كمية منتج في الكارت
export const updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const cart = await cartRepo.findOne({ where: { id }, relations: ["product"] });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.quantity = quantity || cart.quantity;
    await cartRepo.save(cart);
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating cart" });
  }
};

// 🗑️ حذف كارت
export const deleteCart = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await cartRepo.delete(id);
    if (result.affected === 0) return res.status(404).json({ error: "Cart not found" });

    res.json({ message: "Cart deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting cart" });
  }
};