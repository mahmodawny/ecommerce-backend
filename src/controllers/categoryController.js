import { AppDataSource } from "../app.js";
import { Category } from "../models/Category.js";

// === GET all categories ===
export const getCategories = async (req, res) => {
  try {
    const categoryRepo = AppDataSource.getRepository(Category);
    const categories = await categoryRepo.find({ relations: ["products"] });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Error fetching categories", error: err.message });
  }
};

// === CREATE category ===
export const createCategory = async (req, res) => {
  try {
    const categoryRepo = AppDataSource.getRepository(Category);
    const newCategory = categoryRepo.create(req.body);
    const savedCategory = await categoryRepo.save(newCategory);
    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(500).json({ message: "Error creating category", error: err.message });
  }
};

// === UPDATE category ===
export const updateCategory = async (req, res) => {
  try {
    const categoryRepo = AppDataSource.getRepository(Category);
    const category = await categoryRepo.findOneBy({ id: parseInt(req.params.id) });
    if (!category) return res.status(404).json({ message: "Category not found" });

    categoryRepo.merge(category, req.body);
    const updated = await categoryRepo.save(category);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating category", error: err.message });
  }
};

// === DELETE category ===
export const deleteCategory = async (req, res) => {
  try {
    const categoryRepo = AppDataSource.getRepository(Category);
    const result = await categoryRepo.delete(req.params.id);
    if (result.affected === 0) return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting category", error: err.message });
  }
};
