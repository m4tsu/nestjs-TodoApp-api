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
import { AuthGuard } from '@nestjs/passport';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { PasswordOmitUser } from '../auth/local.strategy';
import { Board, Status } from '@prisma/client';

@Controller('boards')
@UseGuards(AuthGuard('jwt')) // passport-jwt戦略を付与する
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  async create(
    @Request() req: { user: PasswordOmitUser },
    @Body() data: CreateBoardDto,
  ) {
    return await this.boardsService.create(data, req.user);
  }

  @Get()
  async findAll(
    @Request() req: { user: PasswordOmitUser },
  ): Promise<(Board & { statuses: Status[] })[]> {
    return await this.boardsService.findByUserId(req.user.id);
  }

  @Get(':id')
  async findById(
    @Param('id') id: string,
    @Request() req: { user: PasswordOmitUser },
  ) {
    return await this.boardsService.findById(+id, req.user.id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBoardDto: UpdateBoardDto,
    @Request() req: { user: PasswordOmitUser },
  ) {
    return await this.boardsService.update(+id, updateBoardDto, req.user.id);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Request() req: { user: PasswordOmitUser },
  ) {
    return await this.boardsService.remove(+id, req.user.id);
  }
}
