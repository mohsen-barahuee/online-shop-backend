import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGaurd } from 'src/auth/guard/jwt-auth.gaurd';
import { Roles } from 'src/auth/decorators/role.decorator';
import UsersRoleEnum from 'enums/usersRoleEnums';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body()
    createUserDto: CreateUserDto,
  ) {
    const user = await this.usersService.create(createUserDto);

    return {
      statusCode: HttpStatus.OK,
      data: user,
      message: 'کاربر با موفقیت ساخته شد',
    };
  }

  @Roles(UsersRoleEnum.Admin)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGaurd)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
