import { PartialType } from '@nestjs/mapped-types';
import { IsString, Length, IsNotEmpty } from 'class-validator';
import { CreateBoardDto } from './create-board.dto';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  @IsString()
  @Length(0, 40)
  @IsNotEmpty()
  name: string;
}
