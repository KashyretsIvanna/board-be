import { IntersectionType, PickType } from '@nestjs/swagger';
import { FullBoardDto } from 'src/common/dto/board.dto';

export class CreateBoardReq extends IntersectionType(
  PickType(FullBoardDto, ['name']),
) {}
