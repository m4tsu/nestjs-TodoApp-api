import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateStatusDto {
  @IsString()
  @Length(0, 20)
  @IsNotEmpty()
  name: string;
}
