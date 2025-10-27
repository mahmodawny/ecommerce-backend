import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User.js";
import { CartItem } from "./CartItem.js";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id;

  @ManyToOne(() => User, (user) => user.carts, { onDelete: "CASCADE" })
  user;

  @OneToMany(() => CartItem, (item) => item.cart, { cascade: true })
  items;

  @Column({ type: "float", default: 0 })
  total;
}
