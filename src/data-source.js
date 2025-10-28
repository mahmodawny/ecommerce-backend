import "reflect-metadata";
import { DataSource } from "typeorm";
import { Product } from "./models/Product.js";
import { Category } from "./models/Category.js";
import { Cart } from "./models/Cart.js";
import { Order } from "./models/Order.js";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "ecommerce.db",
  synchronize: true,
  logging: false,
  entities: [Product, Category, Cart, Order],
});
