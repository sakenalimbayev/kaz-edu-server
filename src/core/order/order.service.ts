import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UserEntity } from '../user/user.entity';

@Injectable()
export default class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  private readonly logger = new Logger(OrderService.name);

  async findAll(): Promise<OrderEntity[]> {
    this.logger.log(`Invoking method: [${this.findAll.name}]`);
    return this.orderRepository.find({ relations: ['orderedBy'] });
  }

  async findById(id: string): Promise<OrderEntity> {
    this.logger.log(`Invoking method: [${this.findById.name}] with id [${id}]`);
    return this.orderRepository.findOneOrFail({
      where: { id },
      relations: ['orderedBy'],
    });
  }

  async createOrder(
    createOrderDto: CreateOrderDto,
  ): Promise<OrderEntity | null> {
    const user = await this.userRepository.findOneOrFail({
      where: { id: createOrderDto.userId },
    });
    if (user) {
      const order = this.orderRepository.create(createOrderDto);
      order.orderedBy = user;
      return this.orderRepository.save(order);
    }

    return null;
  }
}
