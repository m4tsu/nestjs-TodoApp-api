import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaService } from 'src/prisma.service';
import { BoardsService } from 'src/boards/boards.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService, PrismaService, BoardsService],
})
export class TasksModule {}
