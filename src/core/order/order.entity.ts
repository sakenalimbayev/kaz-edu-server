import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  totalSum: number;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  orderedBy: UserEntity;
}
