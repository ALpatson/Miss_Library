import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientRepository extends Repository<Client> {
  constructor(private dataSource: DataSource) {
    super(Client, dataSource.createEntityManager());
  }

  async findAllWithBooksCount(): Promise<Client[]> {
    return this.createQueryBuilder('client')
      .leftJoinAndSelect('client.sales', 'sale')
      .loadRelationCountAndMap('client.booksCount', 'client.sales')
      .getMany();
  }

  async findOneWithDetails(id: number): Promise<Client | null> {
    return this.createQueryBuilder('client')
      .where('client.id = :id', { id })
      .loadRelationCountAndMap('client.booksCount', 'client.sales')
      .getOne();
  }

  async findOneWithPurchases(id: number): Promise<Client | null> {
    return this.createQueryBuilder('client')
      .leftJoinAndSelect('client.sales', 'sale')
      .leftJoinAndSelect('sale.book', 'book')
      .leftJoinAndSelect('book.author', 'author')
      .where('client.id = :id', { id })
      .getOne();
  }
}