import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order-items.entity';
import { UsersService } from 'src/users/users.service';
import { AddressService } from 'src/address/address.service';
import { ProductsService } from 'src/products/products.service';
import { OrderStatus } from 'enums/orderStatus.enum';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

interface ZibalRequestResponse {
  result: number;
  trackId: string;
  message: string;
}
@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

    private readonly addressService: AddressService,
    private readonly productService: ProductsService,
    private readonly userService: UsersService,
    private readonly httpService: HttpService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const user = (await this.userService.findOne(createOrderDto.userId)).data;

    const address = (
      await this.addressService.findOne(createOrderDto.addressId)
    ).data;

    const order = this.orderRepository.create({
      user,
      address,

      discount_code: createOrderDto.discount_code,
      status: createOrderDto.status || OrderStatus.PENDING,
    });

    const savedOrder = await this.orderRepository.save(order);

    let totalPrice: number = 0;

    if (createOrderDto.items && createOrderDto.items.length > 0) {
      const orderItems = createOrderDto.items.map(async (item) => {
        const product = await this.productService.findOne(item.productId);

        totalPrice += product.price;

        const orderItem = this.orderItemRepository.create({
          order: savedOrder,
          product,
        });

        return this.orderItemRepository.save(orderItem);
      });

      await Promise.all(orderItems);
    }

    await this.orderRepository.update(
      { id: savedOrder.id },
      { total_price: totalPrice },
    );

    const returnedOrder = await this.orderRepository.findOne({
      where: { id: savedOrder.id },
      relations: ['user', 'address', 'items', 'items.product'],
    });

    return returnedOrder;
  }

  async findAll() {
    return await this.orderRepository.find({
      relations: ['user', 'address', 'items', 'items.product'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  async startPayment(amount: number): Promise<ZibalRequestResponse> {
    const body: object = {
      merchant: 'zibal',
      amount: amount * 10,
      callbackUrl: 'http://localhost:3000/orders/peyment/verfiy',
    };

    const response = this.httpService.post(
      'https://gateway.zibal.ir/v1/request',
      body,
    );
    const axiosResponse = await lastValueFrom(response);

    return axiosResponse.data as ZibalRequestResponse;
  }
}
