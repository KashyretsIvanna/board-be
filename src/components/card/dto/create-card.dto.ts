import { IntersectionType, PickType } from '@nestjs/swagger';
import { FullCardDto } from 'src/common/dto/card.dto';

export class CreateCardReq extends IntersectionType(
  PickType(FullCardDto, ['title', 'description', 'statusId']),
) {}
