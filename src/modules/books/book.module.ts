import { Module } from '@nestjs/common';
import { BooksService } from './book.service';
import { BooksController } from './book.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BooksModel } from './models';
import { FileUploadService } from '../file-upload';

@Module({
  imports: [SequelizeModule.forFeature([BooksModel])],
  controllers: [BooksController],
  providers: [BooksService, FileUploadService],
})
export class BookModule {}
