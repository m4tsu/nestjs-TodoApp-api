import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, User } from '@prisma/client';
import { PasswordOmitUser } from 'src/auth/local.strategy';
import { PrismaService } from 'src/prisma.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

const DEFAULT_STATUSES = [
  {
    name: 'Todo',
  },
  {
    name: 'InProgress',
  },
  {
    name: 'Done',
  },
];

@Injectable()
export class BoardsService {
  constructor(private db: PrismaService) {}

  async create(data: CreateBoardDto, user: PasswordOmitUser) {
    const board = await this.db.board.create({
      data: {
        ...data,
        userId: user.id,
        statuses: {
          create: DEFAULT_STATUSES,
        },
      },
      include: {
        statuses: true,
      },
    });
    return board;
  }

  async findByUserId(userId: User['id']) {
    const boards = await this.db.board.findMany({
      where: { userId },
      include: { statuses: true },
    });
    return boards;
  }

  async findById(id: Board['id'], userId: User['id']) {
    const board = await this.db.board.findUnique({
      where: { id },
      include: { statuses: true, tasks: true },
    });
    if (!board || board.userId !== userId) {
      throw new NotFoundException();
    }
    return board;
  }

  async update(id: Board['id'], data: UpdateBoardDto, userId: User['id']) {
    const board = await this.findById(id, userId);
    return await this.db.board.update({
      where: { id: board.id },
      data: { ...data, updatedAt: new Date() },
    });
  }

  async remove(id: Board['id'], userId: User['id']) {
    const board = await this.findById(id, userId);
    const deleteStatuses = this.db.status.deleteMany({
      where: { boardId: board.id },
    });
    const deleteBoard = this.db.board.delete({ where: { id } });
    const transaction = await this.db.$transaction([
      deleteStatuses,
      deleteBoard,
    ]);
    return transaction;
  }
}
