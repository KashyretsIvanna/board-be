import { IntersectionType, PickType } from '@nestjs/swagger';
import { FullCardDto } from 'src/common/dto/card.dto';
import { FullStatusDto } from 'src/common/dto/status.dto';

export class StatusesRes extends IntersectionType(
  PickType(FullStatusDto, ['name', 'id']),
) {
  cards: FullCardDto[];
}
