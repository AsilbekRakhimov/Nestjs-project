import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BooksModel } from './models';
import { createBookInterface, createBookInterfaceResponse } from './interfaces';
import { FileUploadService } from '../file-upload';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(BooksModel) private booksModel: typeof BooksModel,
    private fileUploadService: FileUploadService,
  ) {}

  async createOneFood(bookData: createBookInterface): Promise<void> {
    
    const data = await this.fileUploadService.uploadFile({
      file: bookData.image,
      destination: 'uploads/books',
    });
    

    await this.booksModel.create({
      name: bookData.name,
      author: bookData.author,
      cost: bookData.cost,
      count: bookData.count,
      image: data.imageUrl,
    });
  }
}
