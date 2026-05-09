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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import type { Response } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(
    @Res() res: Response,
    @Body() createProductDto: CreateProductDto,
  ) {
    const product = await this.productsService.create(createProductDto);

    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      data: product,
      message: 'محصول با موفقیت ایجاد شد',
    });
  }

  @Get()
  async findAll(@Res() res: Response) {
    const products = await this.productsService.findAll();
    return res.status(HttpStatus.FOUND).json({
      statusCode: HttpStatus.FOUND,
      data: products,
      message: 'لیست محصولات',
    });
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    const product = await this.productsService.findOne(+id);
    return res.status(HttpStatus.FOUND).json({
      statusCode: HttpStatus.FOUND,
      data: product,
      message: 'محصول مورد نظر یافت شد',
    });
  }

  @Patch(':id')
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const product = await this.productsService.update(+id, updateProductDto);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: product,
      message: 'محصول مورد نظر با موفقیت آپدیت شد',
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
