import { EntitySchema } from "typeorm";

export const Cart = new EntitySchema({
  name: "Cart",
  tableName: "carts",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    userId: {
      type: "varchar",
      length: 100,
    },
    productId: {
      type: "int",
    },
    quantity: {
      type: "int",
      default: 1,
    },
    createdAt: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
  },
});
