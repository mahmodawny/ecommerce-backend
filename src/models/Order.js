import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Product } from "./Product.js";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id;

  @Column({ type: "varchar", length: 100 })
  userId;

  @ManyToMany(() => Product)
  @JoinTable()
  products;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  totalAmount;

  @Column({ type: "varchar", length: 50, default: "Pending" })
  status;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt;
}