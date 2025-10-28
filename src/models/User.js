import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Order } from "./Order.js";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id;

  @Column({ type: "varchar" })
  name;

  @Column({ unique: true })
  email;

  @Column()
  password;

  @OneToMany(() => Order, (order) => order.user)
  orders;
}
