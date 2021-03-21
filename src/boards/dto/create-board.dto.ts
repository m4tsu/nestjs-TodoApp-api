import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  @Length(0, 40)
  @IsNotEmpty()
  name: string;
}
