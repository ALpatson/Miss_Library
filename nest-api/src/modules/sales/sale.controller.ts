

import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './sale.dto';
import { Sale } from './entities/sale.entity';

@Controller('sales')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createSaleDto: CreateSaleDto): Promise<Sale> {
    return this.saleService.create(createSaleDto);
  }
}