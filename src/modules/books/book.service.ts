import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BooksModel } from './models';
import { createBookInterface, createBookInterfaceResponse } from './interfaces';

@Injectable()
export class BooksService {
  constructor(@InjectModel(BooksModel) private booksModel: typeof BooksModel) {}

  async createOneFood(bookData: createBookInterface) : Promise<void> {
    await this.booksModel.create({
        
    })
  }
}
