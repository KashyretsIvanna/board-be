import { SharedModule } from '@app/common/shared';
import { Module } from '@nestjs/common';

import { BoardModule } from '../components/board/board.module';
import { CardModule } from '../components/card/card.module';
import { CategoryModule } from '../components/category/category.module';
import { BoardsController } from '../controllers/boards.controller';
import { CardController } from '../controllers/card.controller';
import { CategoryController } from '../controllers/category.controller';

@Module({
  imports: [SharedModule, BoardModule, CategoryModule, CardModule],
  controllers: [BoardsController, CardController, CategoryController],
})
export class AppModule {}
