import { IsString, IsOptional, MaxLength, IsUrl } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  @MaxLength(100)
  firstName: string;

  @IsString()
  @MaxLength(100)
  lastName: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  photoUrl?: string;
}

export class UpdateAuthorDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  firstName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  lastName?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  photoUrl?: string;
}