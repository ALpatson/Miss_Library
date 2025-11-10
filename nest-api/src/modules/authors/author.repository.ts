import { Injectable } from '@nestjs/common';
import { AuthorModel, CreateAuthorModel, UpdateAuthorModel } from './author.model';
import { AuthorEntity, AuthorId } from './author.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorRepository {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,
  ) {}

  public async getAllAuthors(): Promise<AuthorModel[]> {
    const authors = await this.authorRepository
      .createQueryBuilder('author')
      .leftJoinAndSelect('author.books', 'book')
      .loadRelationCountAndMap('author.booksCount', 'author.books')
      .getMany();

    return authors.map((author) => ({
      ...author,
      booksCount: (author as any).booksCount || 0,
    }));
  }

  public async getAuthorById(id: AuthorId): Promise<AuthorModel | null> {
    const author = await this.authorRepository
      .createQueryBuilder('author')
      .where('author.id = :id', { id })
      .loadRelationCountAndMap('author.booksCount', 'author.books')
      .getOne();

    if (!author) return null;

    return {
      ...author,
      booksCount: (author as any).booksCount || 0,
    };
  }

  public async getAuthorWithStats(id: AuthorId): Promise<AuthorModel | null> {
    const author = await this.authorRepository
      .createQueryBuilder('author')
      .leftJoinAndSelect('author.books', 'book')
      .leftJoinAndSelect('book.sales', 'sale')
      .where('author.id = :id', { id })
      .getOne();

    if (!author) return null;

    const booksCount = author.books?.length || 0;
    const totalSales = author.books?.reduce((sum, book) => {
      return sum + (book.sales?.length || 0);
    }, 0) || 0;
    const averageSales = booksCount > 0 ? totalSales / booksCount : 0;

    return {
      ...author,
      booksCount,
      averageSales: Math.round(averageSales * 100) / 100,
    };
  }

  public async createAuthor(author: CreateAuthorModel): Promise<AuthorModel> {
    return this.authorRepository.save(this.authorRepository.create(author));
  }

  public async updateAuthor(
    id: AuthorId,
    author: UpdateAuthorModel,
  ): Promise<AuthorModel | null> {
    await this.authorRepository.update(id, author);
    return this.getAuthorById(id);
  }

  public async deleteAuthor(id: AuthorId): Promise<void> {
    await this.authorRepository.delete(id);
  }
}