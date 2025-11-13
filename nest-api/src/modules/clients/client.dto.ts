
import { IsString, IsEmail, IsOptional, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  lastName: string;

  @IsEmail()
  @IsOptional()
  @MaxLength(255)
  email?: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  photoUrl?: string | null;
}

export class UpdateClientDto {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  firstName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  lastName?: string;

  @IsEmail()
  @IsOptional()
  @MaxLength(255)
  email?: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  photoUrl?: string | null;
}