import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModel } from './models';
import { UserController } from './user.controller';
import { UsersService } from './user.service';

@Module({
  imports: [SequelizeModule.forFeature([UsersModel])],
  controllers: [UserController],
  providers: [UsersService],
})
export class UserModule {}
