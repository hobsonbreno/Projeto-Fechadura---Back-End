import { Test, TestingModule } from '@nestjs/testing';
import { RaspberryController } from './raspberry.controller';

describe('RaspberryController', () => {
  let controller: RaspberryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RaspberryController],
    }).compile();

    controller = module.get<RaspberryController>(RaspberryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
