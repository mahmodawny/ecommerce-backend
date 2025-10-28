import { EntitySchema } from "typeorm";

export const CartItem = new EntitySchema({
  name: "CartItem",
  tableName: "cart_items",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    quantity: {
      type: "int",
      default: 1,
    },
  },
  relations: {
    product: {
      target: "Product",
      type: "many-to-one",
      joinColumn: true,
      eager: true,
    },
    cart: {
      target: "Cart",
      type: "many-to-one",
      joinColumn: true,
    },
  },
});