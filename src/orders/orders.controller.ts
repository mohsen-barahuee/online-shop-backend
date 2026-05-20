import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import type { Response } from 'express';
import { PaymentDto } from './dto/payment-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Res() res: Response, @Body() createOrderDto: CreateOrderDto) {
    const order = await this.ordersService.create(createOrderDto);
    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      data: order,
      message: 'دیتا با موفقیت ساخته شد',
    });
  }

  @Get()
  async findAll(@Res() res: Response) {
    const order = await this.ordersService.findAll();
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: order,
      message: 'دیتا با موفقیت پیدا شد',
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }

  @Post('/start-payment')
  async startPayment(@Res() res: Response, @Body() paymentDto: PaymentDto) {
    const payment = await this.ordersService.startPayment(paymentDto.amount);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        ...payment,
        peyment_url: `https://gateway.zibal.ir/start/${payment.trackId}`,
      },
      message: 'دیتا با موفقیت پیدا شد',
    });
  }

  @Get('/peyment/verfiy')
  verfiyPeyment() {
    return 'peyment succesfull';
  }
}
