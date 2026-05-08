import {
  Controller,
  Get,
  Post,
  Res,
  Body,
  Param,
  HttpStatus,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import type { Response } from 'express';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  async create(
    @Res() res: Response,
    @Body()
    createTicketDto: CreateTicketDto,
  ) {
    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      data: await this.ticketsService.create(createTicketDto),
      message: 'تیکت ثبت شد',
    });
  }

  @Get()
  async findAll(@Res() res: Response) {
    return res.status(HttpStatus.ACCEPTED).json({
      statusCode: HttpStatus.ACCEPTED,
      data: await this.ticketsService.findAll(),
      message: 'لیست تمام تیکت ها',
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(+id);
  }
}
