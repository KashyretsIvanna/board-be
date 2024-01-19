import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/common/database/database.service';
import { PrismaErrorHelper } from 'src/common/helpers/prisma-error.helper';

@Injectable()
export class StatusService {
  constructor(private prisma: DatabaseService) {}

  async create(names: string[], boardId: string) {
    try {
      await this.prisma.statuses.createMany({
        data: names.map((el) => ({ name: el, boardId })),
      });
    } catch (err) {
      PrismaErrorHelper(err);
    }
  }

  async getStatusesByBoardId(boardId: string) {
    return this.prisma.statuses.findMany({
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
            statusId: true,
          },
        },
      },
    });
  }
}
