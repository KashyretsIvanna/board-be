import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/common/database/database.service';
import { FullCardDto } from 'src/common/dto/card.dto';
import { PrismaErrorHelper } from 'src/common/helpers/prisma-error.helper';

import { CreateCardReq } from './dto/create-card.dto';
import { UpdateCardReq } from './dto/update-card.dto';
import { UpdateCardsOrderReq } from './dto/update-order.dto';

@Injectable()
export class CardService {
  constructor(private prisma: DatabaseService) {}

  async create(card: CreateCardReq) {
    try {
      const cards = await this.getMany(card.statusId);

      return this.prisma.cards.create({
        data: { ...card, order: cards.length + 1, statusId: card.statusId },
      });
    } catch (err) {
      PrismaErrorHelper(err);
    }
  }

  async getMany(statusId: string) {
    return this.prisma.cards.findMany({
      where: { statusId },
    });
  }

  async delete(cardId: string) {
    try {
      await this.prisma.$transaction(async (tx) => {
        const cardToDelete = await tx.cards.findUnique({
          where: { id: cardId },
          select: { statusId: true, order: true },
        });

        await tx.cards.delete({ where: { id: cardId } });

        const statusesToUpdateOrder = await tx.cards.findMany({
          where: {
            order: { gte: cardToDelete.order },
            statusId: cardToDelete.statusId,
          },
          select: { order: true, id: true },
        });

        await Promise.all(
          statusesToUpdateOrder.map((el) =>
            tx.cards.update({
              where: { id: el.id },
              data: { order: el.order - 1 },
            }),
          ),
        );
      });
    } catch (err) {
      PrismaErrorHelper(err);
    }
  }

  async updateOrder(body: UpdateCardsOrderReq) {
    try {
      const [cardsInStatus, reorderedCard] = await Promise.all([
        this.prisma.cards.findMany({
          where: { statusId: body.statusId },
          orderBy: { order: 'asc' },
        }),
        this.prisma.cards.findUnique({
          where: { id: body.cardId },
        }),
      ]);

      if (!reorderedCard) {
        throw new NotFoundException();
      }

      if (body.order > cardsInStatus.length - 1) {
        throw new BadRequestException(
          `Choose another position. Max value is ${cardsInStatus.length}`,
        );
      }

      const targetCard = cardsInStatus[body.order];

      //Index of card to move
      const targetCardIndex = cardsInStatus.findIndex(
        (el: { id: string }) => el.id === targetCard?.id,
      );
      //Index of card we drag
      const draggableCardIndex = cardsInStatus.findIndex(
        (el) => el.id == reorderedCard.id,
      );

      await this.prisma.$transaction(async (tx) => {
        let items: FullCardDto[] = cardsInStatus;

        //If same column - change order, if different - create item for one col and delete it from another
        if (reorderedCard.statusId === body.statusId) {
          items.splice(draggableCardIndex, 1);
          items.splice(
            targetCard !== undefined ? targetCardIndex : cardsInStatus.length,
            0,
            reorderedCard,
          );

          items = items.map((el, index) => ({ ...el, order: index + 1 }));
        } else {
          //Remove from prev column
          await tx.cards.delete({ where: { id: reorderedCard.id } });

          items = await tx.cards.findMany({
            where: {
              order: { gte: reorderedCard.order },
              statusId: reorderedCard.statusId,
            },
          });

          items = items.map((el) => ({ ...el, order: el.order - 1 }));
        }

        await Promise.all(
          items.map((el) =>
            tx.cards.update({
              where: { id: el.id },
              data: { order: el.order },
            }),
          ),
        );

        if (reorderedCard.statusId != body.statusId) {
          //Add to new column

          const newItems = cardsInStatus;

          newItems.splice(
            targetCard !== undefined ? targetCardIndex : cardsInStatus.length,
            0,
            reorderedCard,
          );

          await Promise.all(
            newItems.map((el, index) => {
              return tx.cards.upsert({
                where: { id: el.id },
                create: {
                  ...reorderedCard,
                  statusId: body.statusId,
                  order: index + 1,
                },
                update: { order: index + 1, statusId: body.statusId },
              });
            }),
          );
        }
      });
    } catch (err) {
      PrismaErrorHelper(err);
    }
  }

  async update(body: UpdateCardReq) {
    try {
      const { id, ...payload } = body;

      const res = await this.prisma.cards.update({
        where: { id },
        data: payload,
      });

      return res;
    } catch (err) {
      PrismaErrorHelper(err);
    }
  }
}
