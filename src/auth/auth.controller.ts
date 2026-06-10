import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const { mobile, password, display_name } = registerDto;
    return this.authService.register(mobile, password, display_name);
  }

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { mobile, password } = loginDto;
    return this.authService.login(mobile, password);
  }
}
