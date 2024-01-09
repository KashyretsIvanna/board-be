import { PrismaService } from '@app/common/prisma';
import { Module } from '@nestjs/common';

import { BoardService } from './board.service';
import { CategoryService } from '../category/category.service';

@Module({
  imports: [],
  providers: [PrismaService, BoardService, CategoryService],
  exports: [BoardService],
})
export class BoardModule {}
