import { IntersectionType, PickType } from '@nestjs/swagger';
import { FullBoardDto } from 'src/common/dto/board.dto';
import { FullCardDto } from 'src/common/dto/card.dto';

class BoardStatusesRes extends IntersectionType(
  PickType(FullBoardDto, ['name', 'id']),
) {
  cards: FullCardDto[];
}

export class BoardByIdRes extends IntersectionType(
  PickType(FullBoardDto, ['name', 'id']),
) {
  statuses: BoardStatusesRes[];
}
