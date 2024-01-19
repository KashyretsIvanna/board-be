import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCardsOrderReq {
  @IsString()
  @IsNotEmpty()
  cardId: string;

  @IsString()
  @IsNotEmpty()
  statusId: string;

  @IsNumber()
  @IsOptional()
  order?: number | null;
}
