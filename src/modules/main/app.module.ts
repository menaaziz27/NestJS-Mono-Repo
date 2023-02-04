import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { AdminModule } from '../admin/admin.module';
import { RolesGuard } from '../auth/guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const DB_TYPE = configService.get('DB_TYPE');
        const DB_HOST = configService.get('DB_HOST');
        const DB_PORT = configService.get('DB_PORT');
        const DB_NAME = configService.get('DB_NAME');
        return {
          uri: `${DB_TYPE}://${DB_HOST}:${DB_PORT}/${DB_NAME}`,
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService, RolesGuard],
})
export class AppModule {}
