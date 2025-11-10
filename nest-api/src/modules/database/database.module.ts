import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntity } from '../authors/author.entity';
import { BookEntity } from '../books/entities/book.entity';
import { Client } from '../clients/entities/client.entity';
import { Sale } from '../sales/entities/sale.entity'; 

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [AuthorEntity, BookEntity, Client, Sale], 
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}