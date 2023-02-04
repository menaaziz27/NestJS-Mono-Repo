import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { CurrentUserInterceptor } from '../user/interceptors/current-user.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(CurrentUserInterceptor)
  @Get('protected')
  getHello(): { msg: string } {
    return this.appService.getHello();
  }

  @Get('public')
  getPublic(): { msg: string } {
    return this.appService.getPublic();
  }
}
