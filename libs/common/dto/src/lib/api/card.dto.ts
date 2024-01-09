import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

import { FullCardDto } from '../common';

export class CreateCardReq extends IntersectionType(
  PickType(FullCardDto, ['title', 'description', 'categoryId'])
) {}

export class UpdateCardReq extends IntersectionType(
  PickType(FullCardDto, ['id']),
  PartialType(PickType(FullCardDto, ['title', 'description']))
) {}

export class UpdateCardsOrderReq {
  @IsString()
  @IsNotEmpty()
  cardId: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @IsNumber()
  @IsOptional()
  order?: number | null;
}
