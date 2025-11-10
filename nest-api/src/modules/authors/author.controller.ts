import { Body, Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto, UpdateAuthorDto } from './author.dto';
import { AuthorId } from './author.entity';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  getAllAuthors() {
    return this.authorService.getAllAuthors();
  }

  @Get(':id')
  getAuthorById(@Param('id') id: string) {
    return this.authorService.getAuthorById(id as AuthorId);
  }

  @Get(':id/stats')
  getAuthorWithStats(@Param('id') id: string) {
    return this.authorService.getAuthorWithStats(id as AuthorId);
  }

  @Post()
  createAuthor(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.createAuthor(createAuthorDto);
  }

  @Put(':id')
  updateAuthor(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ) {
    return this.authorService.updateAuthor(id as AuthorId, updateAuthorDto);
  }

  @Delete(':id')
  deleteAuthor(@Param('id') id: string) {
    return this.authorService.deleteAuthor(id as AuthorId);
  }
}