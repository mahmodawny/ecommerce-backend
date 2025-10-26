import { AppDataSource } from "../app.js";
import { Product } from "../models/Product.js";

const productRepo = AppDataSource.getRepository(Product);

export const getProducts = async (req, res) => {
  const products = await productRepo.find();
  res.json(products);
};

export const createProduct = async (req, res) => {
  const { name, price, stock } = req.body;
  const product = productRepo.create({ name, price, stock });
  await productRepo.save(product);
  res.status(201).json(product);
};