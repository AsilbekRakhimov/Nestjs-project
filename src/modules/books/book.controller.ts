import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BooksService } from './book.service';
import { CreateBookDto, UpdateBookDto } from './dtos';
import { createBookInterfaceResponse } from './interfaces';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BooksModel } from './models';

@ApiTags('Books')
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
      await this.booksService.createOneBook({ ...bookData, image });

      return { message: 'succesfully created', statusCode: 201 };
    } catch (error) {
      throw new ConflictException(
        error.message + ' in book controller while creating',
      );
    }
  }

  @Get('/all')
  @ApiOperation({ summary: 'Add book here !' })
  async getBooks(): Promise<BooksModel[]> {
    try {
      return await this.booksService.getAllBooks();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Put('/update/:id')
  @ApiOperation({ summary: 'Update book here !' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async updateBook(
    @Param('id') bookId: number,
    @Body() bookData: UpdateBookDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<void> {
    try {
      await this.booksService.updateOneBook(bookId, { ...bookData, image });
    } catch (error) {
      throw new ConflictException(
        error.message + ' in controller while updating',
      );
    }
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Delete book here !' })
  async deleteBook(@Param('id') bookId: number): Promise<void> {
    try {
      await this.booksService.deleteOneBook(bookId);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
}
