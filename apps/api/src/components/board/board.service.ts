import { FullBoardDto } from '@app/common/dto';
import { PrismaService } from '@app/common/prisma';
import { PrismaErrorHelper } from '@app/common/shared';
import { Injectable, NotFoundException } from '@nestjs/common';

import { CategoryService } from '../category/category.service';

@Injectable()
export class BoardService {
  constructor(
    private prisma: PrismaService,
    private categoryService: CategoryService
  ) {}

  async create(board: Pick<FullBoardDto, 'name'>) {
    const categoryNames = ['To do', 'In progress', 'Done'];

    const result = await this.prisma.board.create({ data: board });
    await this.categoryService.create(categoryNames, result.id);

    return result;
  }

  async getById(board: Pick<FullBoardDto, 'id'>) {
    const result = await this.prisma.board.findUnique({
      where: board,
      select: {
        name: true,
        id: true,
        categories: {
          select: {
            name: true,
            id: true,
            cards: {
              select: {
                description: true,
                title: true,
                id: true,
                order: true,
                categoryId: true,
              },
              orderBy:{order:'asc'}
            },
          },
        },
      },
    });

    if (!result) {
      throw new NotFoundException('Board with such id does not exists');
    }

    return result;
  }

  async deleteById(board: Pick<FullBoardDto, 'id'>) {
    try {
      const res = await this.prisma.board.delete({ where: board });

      return res;
    } catch (e) {
      PrismaErrorHelper(e);
    }
  }
}
