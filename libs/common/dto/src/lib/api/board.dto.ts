import { IntersectionType, PickType } from '@nestjs/swagger';

import { FullBoardDto, FullCardDto } from '../common';

export class CreateBoardReq extends IntersectionType(
  PickType(FullBoardDto, ['name'])
) {}

class BoardCategoriesRes extends IntersectionType(
  PickType(FullBoardDto, ['name', 'id'])
) {
  cards: FullCardDto[];
}

export class BoardByIdRes extends IntersectionType(
  PickType(FullBoardDto, ['name', 'id'])
) {
  categories: BoardCategoriesRes[];
}
