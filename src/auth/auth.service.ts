import { UsersService } from './../users/users.service';
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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
    try {
      const alreadyUser = await this.usersService.findOneByMobile(mobile);
      if (!alreadyUser) {
        const hashedPassword: string = await hash(password, 12);
        return this.usersService.create({
          mobile,
          password: hashedPassword,
          display_name,
          role: UsersRoleEnum.User,
        });
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async login(mobile: string, password: string) {
    try {
      const user = (await this.usersService.findOneByMobile(mobile)).data;

      if (!(await compare(password, user.password))) {
        throw new UnauthorizedException('رمز عبور اشتباه است');
      }

      const payload = {
        mobile: user.mobile,
        sub: user.id,
        display_name: user.display_name,
      };

      const token: string = this.jwtService.sign(payload);

      return {
        statusCode: HttpStatus.FOUND,
        accessToken: token,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
