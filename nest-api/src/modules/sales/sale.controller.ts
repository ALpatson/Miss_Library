import { Controller, Post, Delete, Body, Param, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
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

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return (this.saleService as any).delete(id);
  }
}