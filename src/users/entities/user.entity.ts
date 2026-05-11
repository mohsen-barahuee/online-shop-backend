import UsersRoleEnum from 'enums/usersRoleEnums';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Address } from 'src/address/entities/address.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import { BookmarkProduct } from 'src/products/entities/bookmark-product.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  mobile: string;

  @Column() //making mobile column uniqe
  password: string;

  @Column({ nullable: false })
  display_name: string;

  @Column({ type: 'enum', enum: UsersRoleEnum, default: UsersRoleEnum.User })
  role: UsersRoleEnum;

  @OneToMany(() => Address, (address) => address.user)
  address: Address[];

  @OneToMany(() => Ticket, (ticket) => ticket.user)
  tickets: Ticket[];

  @OneToMany(() => BookmarkProduct, (bookmark) => bookmark.user)
  bookMarks: BookmarkProduct[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
