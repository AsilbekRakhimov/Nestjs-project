import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './user.service';
import { CreateUserDto } from './dtos';
import { createUserResponse } from './interfaces';

@ApiTags('Users')
@Controller()
export class UserController {
  constructor(private service: UsersService) {}

  @Post('/add')
  @ApiOperation({
    summary:"Create user here !"
  })
  async createUser(
    @Body() userData: CreateUserDto,
  ): Promise<createUserResponse> {
    try {
      await this.service.createUser(userData);
      return { message: 'succesfully created', statusCode: 201 };
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
}
