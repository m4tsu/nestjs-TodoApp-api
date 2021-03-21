import { Test, TestingModule } from '@nestjs/testing';
import { BoardsService } from 'src/boards/boards.service';
import { PrismaService } from 'src/prisma.service';
import { StatusesController } from './statuses.controller';
import { StatusesService } from './statuses.service';

describe('StatusesController', () => {
  let controller: StatusesController;
  let service: StatusesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusesController],
      providers: [StatusesService, BoardsService, PrismaService],
    }).compile();

    controller = module.get<StatusesController>(StatusesController);
    service = module.get<StatusesService>(StatusesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
