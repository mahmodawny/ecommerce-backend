import { AppDataSource } from "../app.js";
import { Product } from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const { search, cat, sort = "ASC", page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const productRepo = AppDataSource.getRepository(Product);
    const query = productRepo.createQueryBuilder("product")
      .leftJoinAndSelect("product.category", "category")
      .where("product.deleted_at IS NULL");

    if (search) query.andWhere("product.name ILIKE :search", { search: `%${search}%` });
    if (cat) query.andWhere("category.id = :cat", { cat });

    query.orderBy("product.price", sort.toUpperCase() === "DESC" ? "DESC" : "ASC");
    query.skip(skip).take(limit);

    const products = await query.getMany();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Error fetching products", message: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const productRepo = AppDataSource.getRepository(Product);
    const product = await productRepo.findOne({
      where: { id: parseInt(req.params.id), deleted_at: null },
      relations: ["category"],
    });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Error fetching product", message: err.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, stock, categoryId } = req.body;
    if (!name || !price || stock == null)
      return res.status(400).json({ error: "Missing required fields" });

    const productRepo = AppDataSource.getRepository(Product);
    const product = productRepo.create({ name, price, stock, category: { id: categoryId } });
    await productRepo.save(product);

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: "Error creating product", message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productRepo = AppDataSource.getRepository(Product);
    const product = await productRepo.findOneBy({ id: parseInt(req.params.id) });
    if (!product) return res.status(404).json({ error: "Product not found" });

    productRepo.merge(product, req.body);
    const updated = await productRepo.save(product);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Error updating product", message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productRepo = AppDataSource.getRepository(Product);
    const product = await productRepo.findOneBy({ id: parseInt(req.params.id) });
    if (!product) return res.status(404).json({ error: "Product not found" });

    product.deleted_at = new Date();
    await productRepo.save(product);
    res.json({ message: "Product soft deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting product", message: err.message });
  }
};
