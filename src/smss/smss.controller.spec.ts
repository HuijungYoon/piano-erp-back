import { Test, TestingModule } from '@nestjs/testing';
import { SmssController } from './smss.controller';
import { SmssService } from './smss.service';

describe('SmssController', () => {
  let controller: SmssController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SmssController],
      providers: [SmssService],
    }).compile();

    controller = module.get<SmssController>(SmssController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
