
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Client } from '../../clients/entities/client.entity';
import { BookEntity } from '../../books/entities/book.entity';

@Entity('sales')
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Client, (client) => client.sales, { eager: true })
  client: Client;

  @ManyToOne(() => BookEntity, (book) => book.sales, { eager: true })
  book: BookEntity;

  @Column({ type: 'date' })
  date: string;

  @CreateDateColumn()
  createdAt: Date;
}