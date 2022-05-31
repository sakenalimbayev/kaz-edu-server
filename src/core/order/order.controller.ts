import {
  Body,
  Controller,
  Get,
  Logger,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import OrderService from './order.service';
import { OrderEntity } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('order')
export default class OrderController {
  constructor(private readonly orderService: OrderService) {}

  private readonly logger = new Logger(OrderController.name);

  @Get()
  findAll(): Promise<OrderEntity[]> {
    return this.orderService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id): Promise<OrderEntity> {
    try {
      return await this.orderService.findById(id);
    } catch (err) {
      this.logger.warn(err);
      throw new NotFoundException();
    }
  }

  @Post()
  addOrder(@Body() createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    return this.orderService.createOrder(createOrderDto);
  }
}
