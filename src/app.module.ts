import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { BoardModule } from './components/board/board.module';
import { CardModule } from './components/card/card.module';
import { StatusModule } from './components/status/status.module';

@Module({
  imports: [CommonModule, BoardModule, CardModule, StatusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
