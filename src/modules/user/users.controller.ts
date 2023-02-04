import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { Body, Delete, Param, Patch, UseGuards, UseInterceptors } from '@nestjs/common/decorators';
import { ObjectId } from 'mongoose';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { currentUser } from './decorators/currentUser.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from './entity/user.entity';
import { Role } from './enums/role.enums';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
@UseInterceptors(CurrentUserInterceptor)
@Roles(Role.USER, Role.ADMIN)
@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @currentUser() currentUser: UserDocument,
  ) {
    if (currentUser._id.toString() !== id && !currentUser.roles.includes(Role.ADMIN)) {
      throw new HttpException('You do not have permission to do this task.', HttpStatus.BAD_REQUEST);
    }

    return await this.userService.update(id, updateUserDto);
  }

  @Get('me')
  async whoAmI(@currentUser() user: UserDocument) {
    return user;
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.userService.getOne(id);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string, @currentUser() currentUser: UserDocument) {
    if (currentUser._id.toString() !== id) {
      throw new HttpException('Permission Denied.', HttpStatus.BAD_REQUEST);
    }
    return this.userService.delete(id);
  }

  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get()
  userResource() {
    return { message: 'users resource' };
  }
}
