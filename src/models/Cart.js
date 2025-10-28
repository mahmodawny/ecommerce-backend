import { EntitySchema } from "typeorm";

export const Cart = new EntitySchema({
  name: "Cart",
  tableName: "carts",
  columns: {
    id: {
      primary: true,
      type: "integer",
      generated: true,
    },
    userId: {
      type: "varchar",
      length: 100,
    },
    quantity: {
      type: "integer",
      default: 1,
    },
    createdAt: {
      type: "datetime", 
      default: () => "CURRENT_TIMESTAMP",
    },
  },
  relations: {
    product: {
      target: "Product",
      type: "many-to-one",
      joinColumn: true,
    },
  },
});
