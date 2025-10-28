import { EntitySchema } from "typeorm";

export const Order = new EntitySchema({
  name: "Order",
  tableName: "orders",
  columns: {
    id: {
      primary: true,
      type: "integer", // 👈 SQLite بيستخدم integer مش int
      generated: true,
    },
    userId: {
      type: "varchar",
      length: 100,
    },
    totalAmount: {
      type: "decimal",
      precision: 10,
      scale: 2,
    },
    status: {
      type: "varchar",
      length: 50,
      default: "Pending",
    },
    createdAt: {
      type: "datetime",
      default: () => "CURRENT_TIMESTAMP",
    },
  },
  relations: {
    products: {
      target: "Product",
      type: "many-to-many",
      joinTable: true,
    },
  },
});
