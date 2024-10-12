import { getModelToken } from '@nestjs/sequelize';
import { BooksService } from './book.service';
import { Test, TestingModule } from '@nestjs/testing';
import { BooksModel } from './models';
import { FileUploadService } from '../file-upload';

describe('BooksService', () => {
  let service: BooksService;
  let fileUploadService: FileUploadService

  const booksMockModel = {
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        { provide: getModelToken(BooksModel), useValue: booksMockModel },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    fileUploadService = module.get<FileUploadService>(FileUploadService)
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
  });

  it('should return an array of books', async () => {
    const responseData = [
      {
        id: 1,
        name: 'book name',
        author: 'book author',
        cost: 5,
        count: 20,
        image: 'image url',
      },
    ];
    booksMockModel.findAll.mockResolvedValue(responseData);

    const books = await service.getAllBooks();
    expect(books).toHaveLength(responseData.length);
    expect(books).toMatchObject(responseData);
    expect(booksMockModel.findAll).toHaveBeenCalled();
  });
});
