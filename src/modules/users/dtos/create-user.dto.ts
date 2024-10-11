import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { createUserInterface } from '../interfaces';

export class CreateUserDto implements Omit<createUserInterface, 'image'> {
  @ApiProperty({
    type: String,
    minLength: 3,
    required: true,
    example: 'Asilbek Rahimov',
  })
  @IsString()
  @IsNotEmpty()
  @IsAlpha()
  fullName: string;

  @ApiProperty({
    type: Number,
    minimum: 14,
    required: true,
    example: 15,
  })
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ApiProperty({
    type: String,
    minLength: 11,
    required: true,
    example: 'john@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    minLength: 4,
    required: false,
    example: '3443aaaa',
  })
  @IsOptional()
  password?: string;
}
