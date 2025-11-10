import { Module, forwardRef } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookRepository } from './book.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { AuthorEntity } from '../authors/author.entity';
import { SaleModule } from '../sales/sale.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookEntity, AuthorEntity]),
    forwardRef(() => SaleModule),
  ],
  controllers: [BookController],
  providers: [BookRepository, BookService],
})
export class BookModule {}