import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  price: number;

  @IsInt()
  stock: number;

  @IsOptional()
  @IsArray()
  categoryIds?: number[];
}
