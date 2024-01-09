import { IntersectionType, PickType } from '@nestjs/swagger';

import { FullCardDto, FullCategoryDto } from '../common';

export class CategoriesRes extends IntersectionType(
  PickType(FullCategoryDto, ['name', 'id'])
) {
  cards: FullCardDto[];
}
