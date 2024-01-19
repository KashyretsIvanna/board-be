import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class FullCardDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsInt()
  @IsPositive()
  order: number;

  @IsNotEmpty()
  @IsString()
  statusId: string;
}
