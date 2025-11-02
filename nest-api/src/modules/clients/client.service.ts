

import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientRepository } from './client.repository';
import { CreateClientDto, UpdateClientDto } from './client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientService {
  constructor(private readonly clientRepository: ClientRepository) {}

  async findAll(): Promise<Client[]> {
    return this.clientRepository.findAllWithBooksCount();
  }

  async findOne(id: number): Promise<Client> {
    const client = await this.clientRepository.findOneWithDetails(id);
    
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    
    return client;
  }

  async findOneWithPurchases(id: number): Promise<Client> {
    const client = await this.clientRepository.findOneWithPurchases(id);
    
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    
    return client;
  }

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const client = this.clientRepository.create(createClientDto);
    return this.clientRepository.save(client);
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
    const client = await this.findOne(id);
    
    Object.assign(client, updateClientDto);
    
    return this.clientRepository.save(client);
  }

  async remove(id: number): Promise<void> {
    const client = await this.findOne(id);
    await this.clientRepository.remove(client);
  }
}