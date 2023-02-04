import { Controller, UseGuards, Get, UseInterceptors } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { currentUser } from '../user/decorators/currentUser.decorator';
import { User } from '../user/entity/user.entity';
import { Role } from '../user/enums/role.enums';
import { CurrentUserInterceptor } from '../user/interceptors/current-user.interceptor';

@Controller('admin')
export class AdminController {
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(CurrentUserInterceptor)
  @Get()
  getAdmin(@currentUser() user: User) {
    // I've used interceptors with decorators to get current user since decorators don't have access to the DI container in any way
    // so im getting the user in the interceptor and passing it down to the currentUser decorator
    return user;
  }
}
