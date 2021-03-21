import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { PasswordOmitUser } from 'src/auth/local.strategy';

@Controller('boards/:boardId/tasks')
@UseGuards(AuthGuard('jwt')) // passport-jwt戦略を付与する
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(
    @Param('boardId') boardId: string,
    @Body() data: CreateTaskDto,
    @Request() req: { user: PasswordOmitUser },
  ) {
    return await this.tasksService.create(req.user.id, +boardId, data);
  }

  @Get()
  findAll(
    @Param('boardId') boardId: string,
    @Request() req: { user: PasswordOmitUser },
  ) {
    return this.tasksService.findAllById(req.user.id, +boardId);
  }

  @Get(':id')
  async findById(
    @Param('boardId') boardId: string,
    @Param('id') id: string,
    @Request() req: { user: PasswordOmitUser },
  ) {
    return await this.tasksService.findById(req.user.id, +boardId, +id);
  }

  @Patch(':id')
  async update(
    @Param('boardId') boardId: string,
    @Param('id') id: string,
    @Request() req: { user: PasswordOmitUser },
    @Body() data: UpdateTaskDto,
  ) {
    return await this.tasksService.update(req.user.id, +boardId, +id, data);
  }

  @Delete(':id')
  remove(
    @Param('boardId') boardId: string,
    @Param('id') id: string,
    @Request() req: { user: PasswordOmitUser },
  ) {
    return this.tasksService.remove(req.user.id, +boardId, +id);
  }
}
