import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, Task, User } from '@prisma/client';
import { BoardsService } from 'src/boards/boards.service';
import { PrismaService } from 'src/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private db: PrismaService, private boardService: BoardsService) {}

  async create(userId: User['id'], boardId: Board['id'], data: CreateTaskDto) {
    const board = await this.boardService.findById(boardId, userId);
    const task = await this.db.task.create({
      data: {
        ...data,
        boardId: board.id,
      },
    });
    return task;
  }

  async findAllById(userId: User['id'], boardId: Board['id']) {
    const board = await this.db.board.findUnique({
      where: { id: boardId },
      include: { tasks: true },
    });
    if (!board || board.userId !== userId) {
      throw new NotFoundException();
    }
    return board.tasks;
  }

  async findById(userId: User['id'], boardId: Board['id'], id: Task['id']) {
    const board = await this.db.board.findUnique({
      where: { id: boardId },
      include: { tasks: true },
    });
    if (!board || board.userId !== userId) {
      throw new NotFoundException();
    }
    const task = board.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  async update(
    userId: User['id'],
    boardId: Board['id'],
    id: Task['id'],
    data: UpdateTaskDto,
  ) {
    const task = await this.findById(userId, boardId, id);
    const newTask = this.db.task.update({
      where: { id: task.id },
      data: { ...data, updatedAt: new Date() },
    });
    return newTask;
  }

  async remove(userId: User['id'], boardId: Board['id'], id: Task['id']) {
    const task = await this.findById(userId, boardId, id);
    return this.db.task.delete({ where: { id: task.id } });
  }
}
