import { Injectable } from '@nestjs/common';
import { SaleRepository } from '../sales/sale.repository';
import {
  BookModel,
  CreateBookModel,
  FilterBooksModel,
  UpdateBookModel,
} from './book.model';
import { BookRepository } from './book.repository';

@Injectable()
export class BookService {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly saleRepository: SaleRepository,
  ) {}

  public async getAllBooks(
    input?: FilterBooksModel,
  ): Promise<[BookModel[], number]> {
    return this.bookRepository.getAllBooks(input);
  }

  public async getBookById(id: string): Promise<BookModel | undefined> {
    return this.bookRepository.getBookById(id);
  }

  public async createBook(book: CreateBookModel): Promise<BookModel> {
    return this.bookRepository.createBook(book);
  }

  public async updateBook(
    id: string,
    book: UpdateBookModel,
  ): Promise<BookModel | undefined> {
    const oldBook = await this.getBookById(id);
    if (!oldBook) {
      return undefined;
    }

    return this.bookRepository.updateBook(id, book);
  }

  public async deleteBook(id: string): Promise<void> {
    await this.bookRepository.deleteBook(id);
  }

  public async findBuyers(id: string): Promise<any[]> {
    return this.saleRepository.findByBookId(id);
  }
}