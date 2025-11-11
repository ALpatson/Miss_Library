import { Injectable, NotFoundException } from '@nestjs/common';
import { SaleRepository } from './sale.repository';
import { CreateSaleDto } from './sale.dto';
import { Sale } from './entities/sale.entity';
import { ClientRepository } from '../clients/client.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from '../books/entities/book.entity';

@Injectable()
export class SaleService {
  constructor(
    private readonly saleRepository: SaleRepository,
    private readonly clientRepository: ClientRepository,
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {}

  async create(createSaleDto: CreateSaleDto): Promise<Sale> {
    const client = await this.clientRepository.findOne({
      where: { id: createSaleDto.clientId },
    });

    if (!client) {
      throw new NotFoundException(
        `Client with ID ${createSaleDto.clientId} not found`,
      );
    }

    const book = await this.bookRepository.findOne({
      where: { id: createSaleDto.bookId as any },
    });

    if (!book) {
      throw new NotFoundException(
        `Book with ID ${createSaleDto.bookId} not found`,
      );
    }

    const sale = this.saleRepository.create({
      client,
      book,
      date: createSaleDto.date,
    });

    return this.saleRepository.save(sale);
  }

  async findByClient(clientId: number): Promise<Sale[]> {
    return this.saleRepository.findByClientId(clientId);
  }

  async findByBook(bookId: string): Promise<Sale[]> {
    return this.saleRepository.findByBookId(bookId);
  }

  async delete(id: number): Promise<void> {
    const sale = await this.saleRepository.findOne({ where: { id } });
    
    if (!sale) {
      throw new NotFoundException(`Sale with ID ${id} not found`);
    }
    
    await this.saleRepository.remove(sale);
  }
}