import { PrismaService } from '@app/common/prisma';
import { Module } from '@nestjs/common';

import { CategoryService } from './category.service';

@Module({
  imports: [],
  providers: [PrismaService, CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
