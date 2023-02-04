import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<any> {
    return await this.userService.create(registerDto);
  }

  @Post('login')
  async login(@Body() credentials: LoginDto) {
    const user = await this.authService.validateUser(credentials);

    const token = await this.authService.createToken({ sub: user._id, email: user.email });
    return { token, user };
  }
}
