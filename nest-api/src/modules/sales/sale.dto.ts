

import { IsNotEmpty, IsDateString, IsNumber } from 'class-validator';

export class CreateSaleDto {
  @IsNumber()
  @IsNotEmpty()
  clientId: number;

  @IsNotEmpty()
  bookId: string;

  @IsDateString()
  @IsNotEmpty()
  date: string;
}