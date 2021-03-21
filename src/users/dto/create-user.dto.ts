import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 20)
  name: string;

  @IsString()
  @Length(6, 20)
  password: string;

  @IsString()
  @Length(5, 40)
  email: string;
}
