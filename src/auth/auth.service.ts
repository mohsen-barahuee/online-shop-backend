import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcrypt';
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
}
