import {
  Body,
  ConflictException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BooksService } from './book.service';
import { CreateBookDto } from './dtos';
import { createBookInterfaceResponse } from './interfaces';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Books")
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post('/add')
  @ApiOperation({ summary: 'Add book here !' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async addBook(
    @Body() bookData: CreateBookDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<createBookInterfaceResponse> {
    try {

      await this.booksService.createOneFood({ ...bookData, image });
      
      return { message: 'succesfully created', statusCode: 201 };
    } catch (error) {
      throw new ConflictException(
        error.message + ' in book controller while creating',
      );
    }
  }
}
