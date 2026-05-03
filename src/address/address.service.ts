import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createAddressDto: CreateAddressDto, userId: number) {
    try {
      const user = await this.userRepository.findOneByOrFail({ id: userId });
      const address = this.addressRepository.create({
        ...createAddressDto,
        user,
      });
      const data = await this.addressRepository.save(address);
      return {
        statusCode: HttpStatus.CREATED,
        data,
        message: 'آدرس با موفقیت ساخته شد',
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(): Promise<Address[]> {
    return await this.addressRepository.find({ relations: ['user'] });
  }

  async findOne(id: number) {
    try {
      const address = await this.addressRepository.findOneBy({ id });
      if (!address) throw new BadRequestException();
      return {
        statusCode: HttpStatus.FOUND,
        data: address,
        message: 'آدرس پیدا شد',
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  async remove(id: number): Promise<void> {
    try {
      const address = await this.addressRepository.delete({ id });
      if (address.affected === 0) throw new NotFoundException();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
