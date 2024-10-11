import {
  Body,
  Controller,
  Delete,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { RemoveFileDto, UploadFileDto } from './dtos';
import { RemoveFileResponse, UploadFileInterfaceResponse } from './interfaces';

@ApiTags('Upload')
@Controller('uploads')
export class FileUploadController {
  constructor(private service: FileUploadService) {}

  @Post('/add')
  @ApiOperation({ summary: 'Upload file here !' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Body() payload: UploadFileDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UploadFileInterfaceResponse> {
    return await this.service.uploadFile({ ...payload, file });
  }

  @Delete('/remove')
  @ApiOperation({summary:"Remove file here !"})
  async removeFile(
    @Body() payload: RemoveFileDto,
  ): Promise<RemoveFileResponse> {
    return this.service.removeFile(payload);
  }
}
