import { ApiProperty } from '@nestjs/swagger';
import { createBookInterface } from '../interfaces';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBookDto implements Omit<createBookInterface, 'image'> {
  @ApiProperty({
    type: String,
    minLength: 2,
    required: true,
    example: "O'tkan kunlar",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    minLength: 2,
    required: true,
    example: 'Abdulla Qodiriy',
  })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({
    type: Number,
    minimum: 0,
    required: true,
    example: 20000,
  })
  @IsNumber()
  cost: number;

  @ApiProperty({
    type: Number,
    minimum: 0,
    required: true,
    example: 30,
  })
  @IsNumber()
  count: number;

  @ApiProperty({
    type: String,
    format: 'binary',
    required: false,
  })
  @IsOptional()
  image?: string;
}
