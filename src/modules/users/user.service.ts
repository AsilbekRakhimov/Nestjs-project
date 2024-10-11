import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UsersModel } from './models';
import { createUserInterface } from './interfaces';

@Injectable()
export class UsersService {
  constructor(@InjectModel(UsersModel) private userModel: typeof UsersModel) {}

  async createUser(userData: createUserInterface): Promise<void> {
    await this.userModel.create({
      fullName: userData.fullName,
      age: userData.age,
      email: userData.email,
      password: userData.password,
      role: 'user',
    });
  }
}
