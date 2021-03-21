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
import { StatusesService } from './statuses.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { AuthGuard } from '@nestjs/passport';
import { PasswordOmitUser } from 'src/auth/local.strategy';

@Controller('boards/:boardId/statuses')
@UseGuards(AuthGuard('jwt')) // passport-jwt戦略を付与する
export class StatusesController {
  constructor(private readonly statusesService: StatusesService) {}

  @Post()
  async create(
    @Param('boardId') boardId: string,
    @Body() data: CreateStatusDto,
    @Request() req: { user: PasswordOmitUser },
  ) {
    return await this.statusesService.create(req.user.id, +boardId, data);
  }

  @Get()
  findAll(
    @Param('boardId') boardId: string,
    @Request() req: { user: PasswordOmitUser },
  ) {
    return this.statusesService.findAllById(req.user.id, +boardId);
  }

  @Get(':id')
  async findById(
    @Param('boardId') boardId: string,
    @Param('id') id: string,
    @Request() req: { user: PasswordOmitUser },
  ) {
    return this.statusesService.findById(req.user.id, +boardId, +id);
  }

  @Patch(':id')
  async update(
    @Param('boardId') boardId: string,
    @Param('id') id: string,
    @Request() req: { user: PasswordOmitUser },
    @Body() data: UpdateStatusDto,
  ) {
    return await this.statusesService.update(req.user.id, +boardId, +id, data);
  }

  @Delete(':id')
  async remove(
    @Param('boardId') boardId: string,
    @Param('id') id: string,
    @Request() req: { user: PasswordOmitUser },
  ) {
    return this.statusesService.remove(req.user.id, +boardId, +id);
  }
}
