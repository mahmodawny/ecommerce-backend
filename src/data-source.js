import "reflect-metadata";
import { DataSource } from "typeorm";
import { Product } from "./entities/Product.js";
import { Category } from "./entities/Category.js";
import { Cart } from "./entities/Cart.js";
import { Order } from "./entities/Order.js";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "ecommerce.db",
  synchronize: true,
  logging: false,
  entities: [Product, Category, Cart, Order],
});
