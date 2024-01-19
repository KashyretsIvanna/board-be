import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/common/database/database.service';
import { FullBoardDto } from 'src/common/dto/board.dto';
import { PrismaErrorHelper } from 'src/common/helpers/prisma-error.helper';
import { StatusService } from 'src/components/status/status.service';

@Injectable()
export class BoardService {
  constructor(
    private prisma: DatabaseService,
    private statusService: StatusService,
  ) {}

  async create(board: Pick<FullBoardDto, 'name'>) {
    const statusNames = ['To do', 'In progress', 'Done'];

    const result = await this.prisma.board.create({ data: board });
    await this.statusService.create(statusNames, result.id);

    return result;
  }

  async getById(board: Pick<FullBoardDto, 'id'>) {
    const result = await this.prisma.board.findUnique({
      where: board,
      select: {
        name: true,
        id: true,
        statuses: {
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
              orderBy: { order: 'asc' },
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
