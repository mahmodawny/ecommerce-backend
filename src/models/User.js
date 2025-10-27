import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Cart } from "./Cart.js";
import { Order } from "./Order.js"; 
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id;

  @Column()
  name;

  @Column({ unique: true })
  email;

  @Column()
  password;

  @OneToMany(() => Order, (order) => order.user)
  orders;
}
