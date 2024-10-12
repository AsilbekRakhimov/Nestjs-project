import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './book.controller';
import { BooksService } from './book.service';
import { FileUploadController, FileUploadService } from '../file-upload';

describe('BooksController', () => {
  let booksController: BooksController;
  let booksService: BooksService;

  const mockBooksService = {
    getAllBooks: jest.fn(),
    createBook: jest.fn(),
  };

  const mockFileUploadService = {
    removeFile: jest.fn(),
    uploadFile: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController, FileUploadController],
      providers: [
        {
          provide: BooksService,
          useValue: mockBooksService,
        },
        {
          provide: FileUploadService,
          useValue: mockFileUploadService,
        },
      ],
    }).compile();

    booksController = module.get<BooksController>(BooksController);
    booksService = module.get<BooksService>(BooksService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      const books: any[] = [
        {
          id: 1,
          name: 'book name',
          author: 'book author',
          cost: 5,
          count: 20,
          image: 'image url',
        },
      ];
      mockBooksService.getAllBooks.mockResolvedValue(books);

      const result = await booksController.getBooks();
      expect(result).toEqual(books);
      expect(booksService.getAllBooks).toHaveBeenCalled();
    });
  });
});
