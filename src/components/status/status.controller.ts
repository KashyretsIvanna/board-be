import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { StatusesRes } from './dto/get-statuses.dto';
import { StatusService } from './status.service';

@Controller('status')
@ApiTags('status')
export class StatusController {
  constructor(private statusService: StatusService) {}

  @ApiOperation({ summary: 'Get statuses by board id' })
  @Get('/:boardId')
  getById(@Param('id') boardId: string): Promise<StatusesRes[]> {
    return this.statusService.getStatusesByBoardId(boardId);
  }
}
