import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { User } from '@prisma/client';

export class LoginDto {
  @IsString()
  @Length(6, 20)
  @IsNotEmpty()
  password: string;

  @IsString()
  @Length(5, 40)
  @IsEmail()
  email: string;
}

export class RegisterDto {
  @IsString()
  @Length(3, 20)
  @IsNotEmpty()
  name: string;

  @IsString()
  @Length(6, 20)
  @IsNotEmpty()
  password: string;

  @IsString()
  @Length(5, 40)
  @IsEmail()
  email: string;
}

export class AuthResponse {
  token: string;
  user: User;
}
