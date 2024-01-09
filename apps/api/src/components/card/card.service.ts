import {
  CreateCardReq,
  FullCardDto,
  UpdateCardReq,
  UpdateCardsOrderReq,
} from '@app/common/dto';
import { PrismaService } from '@app/common/prisma';
import { PrismaErrorHelper } from '@app/common/shared';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class CardService {
  constructor(private prisma: PrismaService) {}

  async create(card: CreateCardReq) {
    try {
      const cards = await this.getMany(card.categoryId);

      return this.prisma.cards.create({
        data: { ...card, order: cards.length + 1, categoryId: card.categoryId },
      });
    } catch (err) {
      PrismaErrorHelper(err);
    }
  }

  async getMany(categoryId: string) {
    return this.prisma.cards.findMany({
      where: { categoryId },
    });
  }

  async delete(cardId: string) {
    try {
      await this.prisma.$transaction(async (tx) => {
        const cardToDelete = await tx.cards.findUnique({
          where: { id: cardId },
          select: { categoryId: true, order: true },
        });

        await tx.cards.delete({ where: { id: cardId } });

        const categoriesToUpdateOrder = await tx.cards.findMany({
          where: {
            order: { gte: cardToDelete.order },
            categoryId: cardToDelete.categoryId,
          },
          select: { order: true, id: true },
        });

        await Promise.all(
          categoriesToUpdateOrder.map((el) =>
            tx.cards.update({
              where: { id: el.id },
              data: { order: el.order - 1 },
            })
          )
        );
      });
    } catch (err) {
      PrismaErrorHelper(err);
    }
  }

  async updateOrder(body: UpdateCardsOrderReq) {
    try {
      const [cardsInCategory, reorderedCard] = await Promise.all([
        this.prisma.cards.findMany({
          where: { categoryId: body.categoryId },
          orderBy: { order: 'asc' },
        }),
        this.prisma.cards.findUnique({
          where: { id: body.cardId },
        }),
      ]);

      if (!reorderedCard) {
        throw new NotFoundException();
      }

      if (body.order > cardsInCategory.length - 1) {
        throw new BadRequestException(
          `Choose another position. Max value is ${cardsInCategory.length}`
        );
      }

      const targetCard = cardsInCategory[body.order];

      //Index of card to move
      const targetCardIndex = cardsInCategory.findIndex(
        (el: { id: string }) => el.id === targetCard?.id
      );
      //Index of card we drag
      const draggableCardIndex = cardsInCategory.findIndex(
        (el) => el.id == reorderedCard.id
      );

      await this.prisma.$transaction(async (tx) => {
        let items: FullCardDto[] = cardsInCategory;

        //If same column - change order, if different - create item for one col and delete it from another
        if (reorderedCard.categoryId === body.categoryId) {
          items.splice(draggableCardIndex, 1);
          items.splice(
            targetCard !== undefined ? targetCardIndex : cardsInCategory.length,
            0,
            reorderedCard
          );

          items = items.map((el, index) => ({ ...el, order: index + 1 }));
        } else {
          //Remove from prev column
          await tx.cards.delete({ where: { id: reorderedCard.id } });

          items = await tx.cards.findMany({
            where: {
              order: { gte: reorderedCard.order },
              categoryId: reorderedCard.categoryId,
            },
          });

          items = items.map((el) => ({ ...el, order: el.order - 1 }));
        }

        await Promise.all(
          items.map((el) =>
            tx.cards.update({
              where: { id: el.id },
              data: { order: el.order },
            })
          )
        );

        if (reorderedCard.categoryId != body.categoryId) {
          //Add to new column

          const newItems = cardsInCategory;

          newItems.splice(
            targetCard !== undefined ? targetCardIndex : cardsInCategory.length,
            0,
            reorderedCard
          );

          await Promise.all(
            newItems.map((el, index) => {
              return tx.cards.upsert({
                where: { id: el.id },
                create: {
                  ...reorderedCard,
                  categoryId: body.categoryId,
                  order: index + 1,
                },
                update: { order: index + 1, categoryId: body.categoryId },
              });
            })
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
