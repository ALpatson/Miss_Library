import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthorModel, CreateAuthorModel, UpdateAuthorModel } from './author.model';
import { AuthorRepository } from './author.repository';
import { AuthorId } from './author.entity';

@Injectable()
export class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository) {}

  public async getAllAuthors(): Promise<AuthorModel[]> {
    return this.authorRepository.getAllAuthors();
  }

  public async getAuthorById(id: AuthorId): Promise<AuthorModel> {
    const author = await this.authorRepository.getAuthorById(id);
    
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    
    return author;
  }

  public async getAuthorWithStats(id: AuthorId): Promise<AuthorModel> {
    const author = await this.authorRepository.getAuthorWithStats(id);
    
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    
    return author;
  }

  public async createAuthor(author: CreateAuthorModel): Promise<AuthorModel> {
    return this.authorRepository.createAuthor(author);
  }

  public async updateAuthor(id: AuthorId, author: UpdateAuthorModel): Promise<AuthorModel> {
    const existingAuthor = await this.authorRepository.getAuthorById(id);
    
    if (!existingAuthor) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    
    const updated = await this.authorRepository.updateAuthor(id, author);
    
    if (!updated) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    
    return updated;
  }

  public async deleteAuthor(id: AuthorId): Promise<void> {
    const author = await this.authorRepository.getAuthorById(id);
    
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    
    await this.authorRepository.deleteAuthor(id);
  }
}