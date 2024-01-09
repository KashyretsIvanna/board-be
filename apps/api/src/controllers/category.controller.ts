import { CategoriesRes } from '@app/common/dto';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CategoryService } from '../components/category/category.service';

@Controller('category')
@ApiTags('category')
export class CategoryController {
  constructor(private categoriesService: CategoryService) {}

  @ApiOperation({ summary: 'Get categories by board id' })
  @Get('/:boardId')
  getById(@Param('id') boardId: string): Promise<CategoriesRes[]> {
    return this.categoriesService.getCategoriesByBoardId(boardId);
  }
}
