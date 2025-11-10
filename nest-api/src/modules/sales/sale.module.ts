import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';
import { SaleRepository } from './sale.repository';
import { ClientModule } from '../clients/client.module';
import { BookEntity } from '../books/entities/book.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sale, BookEntity]),
    forwardRef(() => ClientModule), // ← Changed this line
  ],
  controllers: [SaleController],
  providers: [SaleService, SaleRepository],
  exports: [SaleService, SaleRepository],
})
export class SaleModule {}