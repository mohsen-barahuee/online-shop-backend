import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import UsersRoleEnum from 'enums/usersRoleEnums';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(mobile: string, password: string, display_name: string) {
    const hashedPassword: string = await hash(password, 12);
    return this.usersService.create({
      mobile,
      password: hashedPassword,
      display_name,
      role: UsersRoleEnum.User,
    });
  }

  async login(mobile: string, password: string) {
    const user = await this.usersService.findOneByMobile(mobile);

    if (!(await compare(password, user.data.password))) {
      throw new UnauthorizedException('رمز عبور اشتباه است');
    }
  }
}
