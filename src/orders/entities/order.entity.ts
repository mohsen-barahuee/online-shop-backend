import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Address } from 'src/address/entities/address.entity';
import { OrderStatus } from 'enums/orderStatus.enum';
import { OrderItem } from './order-itemts.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'bigint' })
  user_id: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Column({ type: 'timestamp', nullable: true })
  set_time: Date;

  @Column({ type: 'timestamp', nullable: true })
  payed_time: Date;

  @Column({ type: 'bigint', nullable: true })
  address_id: string;

  @Column({ type: 'bigint', default: 0 })
  total_price: string;

  @Column({ type: 'bigint', nullable: true })
  discount_code: string;

  // روابط
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];
}
