import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/common/database/database.service';
import { StatusService } from 'src/components/status/status.service';

import { BoardService } from './board.service';
import { BoardsController } from './boards.controller';

@Module({
  imports: [],
  controllers: [BoardsController],
  providers: [DatabaseService, BoardService, StatusService],
  exports: [BoardService],
})
export class BoardModule {}
