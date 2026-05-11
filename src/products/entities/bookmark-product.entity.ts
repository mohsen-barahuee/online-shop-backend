import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
// فرض بر این است که این مدل‌ها را قبلاً ساخته‌اید
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity('bookmark_product')
export class BookmarkProduct {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'bigint' })
  product_id: number;

  @Column({ type: 'bigint' })
  user_id: number;

  @ManyToOne(() => User, (user) => user.bookMarks)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Product, (product) => product.bookMarks)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
