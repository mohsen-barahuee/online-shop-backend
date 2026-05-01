import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto);
      await this.userRepository.save(user);

      return {
        statusCode: HttpStatus.CREATED,
        data: user,
        message: 'کاربر با موفقیت ساخته شد',
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    try {
      const user = await this.userRepository.find();
      return {
        statusCode: HttpStatus.OK,
        data: user,
        message: 'لیست تمام کاربران',
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException();
      }

      return {
        statusCode: HttpStatus.FOUND,
        data: user,
        message: 'کاربر پیدا شد',
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOneByMobile(mobile: string) {
    try {
      const user = await this.userRepository.findOneBy({ mobile });
      if (!user) {
        throw new NotFoundException();
      }

      return {
        statusCode: HttpStatus.FOUND,
        data: user,
        message: 'کاربر پیدا شد',
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException();
    }

    try {
      await this.userRepository.update(id, updateUserDto);

      return {
        statusCode: HttpStatus.OK,
        data: await this.userRepository.findOneBy({ id }),
        message: 'کاربر با موفقیت بروزرسانی شد',
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async remove(id: number): Promise<void> {
    const user = await this.userRepository.delete(id);

    if (user.affected === 0) {
      throw new BadRequestException();
    }
  }
}
