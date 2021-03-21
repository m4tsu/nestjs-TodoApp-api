import { Test, TestingModule } from '@nestjs/testing';
import { BoardsService } from 'src/boards/boards.service';
import { PrismaService } from 'src/prisma.service';
import { StatusesService } from './statuses.service';

describe('StatusesService', () => {
  let service: StatusesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatusesService, BoardsService, PrismaService],
    }).compile();

    service = module.get<StatusesService>(StatusesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
