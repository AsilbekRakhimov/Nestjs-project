import { ApiProperty } from '@nestjs/swagger';
import { updateBookInterface } from '../interfaces';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBookDto implements Omit<updateBookInterface, 'image'> {
  @ApiProperty({
    type: String,
    minLength: 2,
    example: "O'tkan kunlar",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    minLength: 2,
    example: 'Abdulla Qodiriy',
  })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({
    type: Number,
    minimum: 0,
    example: 20000,
  })
  @IsNumber()
  cost: number;

  @ApiProperty({
    type: Number,
    minimum: 0,
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
