import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/common/database/database.service';

import { StatusController } from './status.controller';
import { StatusService } from './status.service';

@Module({
  imports: [],
  providers: [DatabaseService, StatusService],
  controllers: [StatusController],
  exports: [StatusService],
})
export class StatusModule {}
