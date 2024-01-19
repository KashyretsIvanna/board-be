import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/common/database/database.service';

import { CardController } from './card.controller';
import { CardService } from './card.service';

@Module({
  imports: [],
  controllers: [CardController],
  providers: [DatabaseService, CardService],
  exports: [CardService],
})
export class CardModule {}
