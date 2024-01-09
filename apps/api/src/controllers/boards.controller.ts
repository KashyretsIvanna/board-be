import { BoardByIdRes, CreateBoardReq, FullBoardDto } from '@app/common/dto';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { BoardService } from '../components/board/board.service';

@Controller('board')
@ApiTags('board')
export class BoardsController {
  constructor(private boardService: BoardService) {}

  @ApiOperation({ summary: 'Get board by id' })
  @Get('/:id')
  getById(@Param('id') id: string): Promise<BoardByIdRes> {
    return this.boardService.getById({ id });
  }

  @ApiOperation({ summary: 'Create board' })
  @Post()
  create(@Body() body: CreateBoardReq): Promise<FullBoardDto> {
    return this.boardService.create(body);
  }

  @ApiOperation({ summary: 'Delete board' })
  @Delete('/:id')
  delete(@Param('id') id: string): Promise<FullBoardDto> {
    return this.boardService.deleteById({ id });
  }
}
