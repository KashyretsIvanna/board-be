import { IsNotEmpty, IsString, Max, MaxLength } from 'class-validator';

export class FullBoardDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @MaxLength(30)
  @IsNotEmpty()
  name: string;
}
