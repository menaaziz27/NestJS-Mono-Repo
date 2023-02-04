import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { User, UserSchema } from './entity/user.entity';
import { UserService } from './user.service';
import { UsersController } from './users.controller';
import { UserRepository } from './user.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UserService, UserRepository, CurrentUserInterceptor],
  exports: [UserService, UserRepository, CurrentUserInterceptor],
  controllers: [UsersController],
})
export class UserModule {}
