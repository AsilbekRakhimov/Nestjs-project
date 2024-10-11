import { ApiProperty } from '@nestjs/swagger';
import { UploadFileInterfaceRequest } from '../interfaces';
import { IsNotEmpty, IsString } from 'class-validator';

export class UploadFileDto implements Omit<UploadFileInterfaceRequest, 'file'> {
  @ApiProperty({
    type: 'string',
    required: true,
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  destination: string;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  file: any;
}
