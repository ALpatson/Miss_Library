import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './modules/books/book.module';
import { DatabaseModule } from './modules/database/database.module';
import { AuthorModule } from './modules/authors/author.module';
import { ClientModule } from './modules/clients/client.module';

@Module({
  imports: [DatabaseModule, AuthorModule, BookModule, ClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
