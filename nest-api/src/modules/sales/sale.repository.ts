
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';

@Injectable()
export class SaleRepository extends Repository<Sale> {
  constructor(private dataSource: DataSource) {
    super(Sale, dataSource.createEntityManager());
  }

  async findByClientId(clientId: number): Promise<Sale[]> {
    return this.find({
      where: { client: { id: clientId } },
      relations: ['book', 'book.author'],
      order: { date: 'DESC' },
    });
  }

  async findByBookId(bookId: string): Promise<Sale[]> {
    return this.find({
      where: { book: { id: bookId as any } },
      relations: ['client'],
      order: { date: 'DESC' },
    });
  }
}