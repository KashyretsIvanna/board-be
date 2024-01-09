import { PrismaService } from '@app/common/prisma';
import { PrismaErrorHelper } from '@app/common/shared';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(names: string[], boardId: string) {
    try {
      await this.prisma.categories.createMany({
        data: names.map((el) => ({ name: el, boardId })),
      });
    } catch (err) {
      PrismaErrorHelper(err);
    }
  }

  async getCategoriesByBoardId(boardId: string) {
    return this.prisma.categories.findMany({
      where: { boardId },
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
        },
      },
    });
  }
}
