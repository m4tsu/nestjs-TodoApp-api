import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import bcrypt = require('bcrypt');

@Injectable()
export class UserService {
  constructor(private db: PrismaService) {}

  async findByEmail(email: User['email']): Promise<User | null> {
    const user = await this.db.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async findById(id: User['id']): Promise<User | null> {
    const user = await this.db.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException();
    }
    delete user.password;
    return user;
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const existing = await this.db.user.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      throw new ConflictException('email_already_exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.db.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    delete user.password;
    return user;
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.db.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.db.user.delete({
      where,
    });
  }
}
