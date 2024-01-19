import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { FullCardDto } from 'src/common/dto/card.dto';

export class UpdateCardReq extends IntersectionType(
  PickType(FullCardDto, ['id']),
  PartialType(PickType(FullCardDto, ['title', 'description'])),
) {}
