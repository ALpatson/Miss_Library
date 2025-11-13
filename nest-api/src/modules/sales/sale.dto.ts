import { IsInt, IsString, IsDateString } from 'class-validator';

export class CreateSaleDto {
  @IsInt()
  clientId: number;

  @IsString()
  bookId: string;

  @IsDateString()
  date: string;
}


export class PurchaseBookAuthorDto {
  firstName: string;
  lastName: string;
}

export class PurchaseBookDto {
  id: string;
  title: string;
  yearPublished: number;
  author: PurchaseBookAuthorDto;
}

export class PurchaseDto {
  id: number;
  date: string;
  book: PurchaseBookDto;
}