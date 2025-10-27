import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Column, CreateDateColumn } from "typeorm";
import { User } from "./User.js";
import { CartItem } from "./CartItem.js";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id;

  @ManyToOne(() => User, (user) => user.orders, { onDelete: "CASCADE" })
  user;

  @OneToMany(() => CartItem, (item) => item.order, { cascade: true })
  items;

  @Column({ type: "float" })
  total;

  @CreateDateColumn()
  createdAt;
}
