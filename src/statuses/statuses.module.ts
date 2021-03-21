import { Module } from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { StatusesController } from './statuses.controller';
import { BoardsService } from 'src/boards/boards.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [StatusesController],
  providers: [StatusesService, BoardsService, PrismaService],
})
export class StatusesModule {}
