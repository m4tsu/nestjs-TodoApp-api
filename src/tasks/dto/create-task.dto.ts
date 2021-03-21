import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @Length(0, 40)
  @IsNotEmpty()
  title: string;

  @IsString()
  body?: string;

  @IsNumber()
  statusId: number;
}
