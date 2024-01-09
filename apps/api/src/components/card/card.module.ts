import { PrismaService } from '@app/common/prisma';
import { Module } from '@nestjs/common';

import { CardService } from './card.service';

@Module({
  imports: [],
  providers: [PrismaService, CardService],
  exports: [CardService],
})
export class CardModule {}
