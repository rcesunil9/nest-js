import { Test, TestingModule } from '@nestjs/testing';
import { UserScreenController } from './user-screen.controller';

describe('UserScreenController', () => {
  let controller: UserScreenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserScreenController],
    }).compile();

    controller = module.get<UserScreenController>(UserScreenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
