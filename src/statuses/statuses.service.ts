import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, Status, User } from '@prisma/client';
import { BoardsService } from 'src/boards/boards.service';
import { PrismaService } from 'src/prisma.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Injectable()
export class StatusesService {
  constructor(private db: PrismaService, private boardService: BoardsService) {}
  async create(
    userId: User['id'],
    boardId: Board['id'],
    data: CreateStatusDto,
  ) {
    const board = await this.boardService.findById(boardId, userId);
    const status = await this.db.status.create({
      data: {
        ...data,
        boardId: board.id,
      },
    });
    return status;
  }

  async findAllById(userId: User['id'], boardId: Board['id']) {
    const board = await this.db.board.findUnique({
      where: { id: boardId },
      include: { statuses: true },
    });
    if (!board || board.userId !== userId) {
      throw new NotFoundException();
    }
    return board.statuses;
  }

  async findById(userId: User['id'], boardId: Board['id'], id: Status['id']) {
    const board = await this.db.board.findUnique({
      where: { id: boardId },
      include: { statuses: true },
    });
    if (!board || board.userId !== userId) {
      throw new NotFoundException();
    }
    const status = board.statuses.find((status) => status.id === id);
    if (!status) {
      throw new NotFoundException();
    }
    return status;
  }

  async update(
    userId: User['id'],
    boardId: Board['id'],
    id: Status['id'],
    data: UpdateStatusDto,
  ) {
    const status = await this.findById(userId, boardId, id);
    const newStatus = this.db.status.update({
      where: { id: status.id },
      data: { ...data, updatedAt: new Date() },
    });
    return newStatus;
  }

  async remove(userId: User['id'], boardId: Board['id'], id: Status['id']) {
    const status = await this.findById(userId, boardId, id);
    return this.db.status.delete({ where: { id: status.id } });
  }
}
