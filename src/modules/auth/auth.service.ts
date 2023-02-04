import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Hash } from 'src/utils/Hash';
import { UserJwtPayload } from './jwt-payload';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(payload: LoginDto): Promise<any> {
    const user = await this.userService.getByEmail(payload.email);

    if (!user || !Hash.compare(payload.password, user.password)) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    user.password = undefined;

    return user;
  }

  async createToken(payload: UserJwtPayload) {
    return this.jwtService.sign(payload);
  }
}
