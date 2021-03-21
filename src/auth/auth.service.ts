import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from 'src/users/users.service';
import { JWTPayload } from './auth.interface';
import { RegisterDto } from './dto/auth.dto';

type PasswordOmitUser = Omit<User, 'password'>;

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async register(data: RegisterDto) {
    const user = await this.userService.create(data);
    return {
      access_token: this.jwtService.sign({
        id: user.id,
        email: user.email,
      }),
      user,
    };
  }

  // ユーザーを認証する
  async validateUser(
    email: User['email'],
    pass: User['password'],
  ): Promise<PasswordOmitUser | null> {
    const user = await this.userService.findByEmail(email);
    const passwordValid = await bcrypt.compare(pass, user.password);
    if (user && passwordValid) {
      const { password, ...result } = user; // パスワード情報を外部に出さないようにする

      return result;
    }

    return null;
  }

  async login(user: PasswordOmitUser) {
    const payload: JWTPayload = { id: user.id, email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
