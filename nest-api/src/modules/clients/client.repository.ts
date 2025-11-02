

import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientRepository extends Repository<Client> {
  constructor(private dataSource: DataSource) {
    super(Client, dataSource.createEntityManager());
  }

  async findAllWithBooksCount(): Promise<Client[]> {
    // Temporarily returns clients without book count
    // We'll add the sales relationship later
    return this.find();
  }

  async findOneWithDetails(id: number): Promise<Client | null> {
    return this.findOne({ where: { id } });
  }

  async findOneWithPurchases(id: number): Promise<Client | null> {
    // Will be implemented after creating Sale entity
    return this.findOne({ where: { id } });
  }
}