import { Product } from 'src/products/entities/product.entity';
import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { title, price, description, categoryIds, stock } = createProductDto;

    const product = this.productRepository.create({
      title,
      price,
      description,
      stock,
    });

    if (categoryIds) {
      const categories = await this.categoryRepository.findBy({
        id: In(categoryIds),
      });

      product.categories = categories;
    }

    return await this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({ relations: ['categories'] });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['categories'],
    });

    if (!product) throw new NotFoundException();

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      await this.productRepository.update(id, updateProductDto);

      return this.productRepository.findOneBy({ id });
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
