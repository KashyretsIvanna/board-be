import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FullCardDto } from 'src/common/dto/card.dto';

import { CardService } from './card.service';
import { CreateCardReq } from './dto/create-card.dto';
import { UpdateCardReq } from './dto/update-card.dto';
import { UpdateCardsOrderReq } from './dto/update-order.dto';

@Controller('card')
@ApiTags('card')
export class CardController {
  constructor(private cardService: CardService) {}

  @ApiOperation({ summary: 'Update card order' })
  @Patch('order')
  updateOrder(@Body() body: UpdateCardsOrderReq): Promise<void> {
    return this.cardService.updateOrder(body);
  }

  @ApiOperation({ summary: 'Update card' })
  @Patch()
  update(@Body() body: UpdateCardReq): Promise<FullCardDto> {
    return this.cardService.update(body);
  }

  @ApiOperation({ summary: 'Create card' })
  @Post()
  create(@Body() body: CreateCardReq): Promise<FullCardDto> {
    return this.cardService.create(body);
  }

  @ApiOperation({ summary: 'Delete card' })
  @Delete('/:id')
  delete(@Param('id') id: string): Promise<void> {
    return this.cardService.delete(id);
  }
}
