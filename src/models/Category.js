import { EntitySchema } from "typeorm";

export const Category = new EntitySchema({
  name: "Category",
  tableName: "categories",
  columns: {
    id: {
      primary: true,
      type: "integer",
      generated: true,
    },
    name: {
      type: "varchar",
      unique: true,
    },
    description: {
      type: "text",
      nullable: true,
    },
    created_at: {
      type: "datetime", 
      createDate: true,
    },
    updated_at: {
      type: "datetime",
      updateDate: true,
    },
  },
  relations: {
    products: {
      target: "Product",   
      type: "one-to-many",
      inverseSide: "category", 
    },
  },
});
