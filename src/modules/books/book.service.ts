import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BooksModel } from './models';
import {
  createBookInterface,
  createBookInterfaceResponse,
  updateBookInterface,
} from './interfaces';
import { FileUploadService } from '../file-upload';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(BooksModel) private booksModel: typeof BooksModel,
    private fileUploadService: FileUploadService,
  ) {}

  async createOneBook(bookData: createBookInterface): Promise<void> {
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

  async getAllBooks(): Promise<BooksModel[]> {
    return await this.booksModel.findAll();
  }

  async updateOneBook(
    bookId: number,
    bookData: updateBookInterface,
  ): Promise<void> {
    const foundedBook = await this.booksModel.findOne({
      where: {
        id: bookId,
      },
    });
    if (!foundedBook) {
      return null;
    }
    let data: any;
    if (bookData.image) {
      await this.fileUploadService.removeFile({ fileName: foundedBook.image });
      data = await this.fileUploadService.uploadFile({
        file: bookData.image,
        destination: '/uploads/books',
      });
    }
    await this.booksModel.update(
      {
        name: bookData?.name,
        author: bookData?.author,
        count: bookData?.count,
        cost: bookData?.cost,
        image: data.imageUrl,
      },
      {
        where: {
          id: bookId,
        },
      },
    );
  }

  async deleteOneBook(bookId: number): Promise<void> {
    const foundedBook = await this.booksModel.findOne({
      where: {
        id: bookId,
      },
    });
    if (foundedBook) {
      await this.fileUploadService.removeFile({ fileName: foundedBook.image });
      await this.booksModel.destroy({
        where: {
          id: bookId,
        },
      });
    }
  }
}
