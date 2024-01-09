import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class FullCategoryDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @MaxLength(30)
  name: string;

  @IsString()
  @IsNotEmpty()
  boardId: string;
}
