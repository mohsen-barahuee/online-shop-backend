import { Controller, Get, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import type { Response } from 'express';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(
    @Res() res: Response,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    const category = await this.categoriesService.create(createCategoryDto);

    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      data: category,
      message: 'دسته بندی با موفقیت اضافه گردید',
    });
  }

  @Get()
  async findAll(@Res() res: Response) {
    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      data: await this.categoriesService.findAll(),
      message: 'لیست دسته بندی هایه محصولات',
    });
  }
}
