import { Test, TestingModule } from '@nestjs/testing';
import { SmssService } from './smss.service';

describe('SmssService', () => {
  let service: SmssService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SmssService],
    }).compile();

    service = module.get<SmssService>(SmssService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
