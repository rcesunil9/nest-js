import { Test, TestingModule } from '@nestjs/testing';
import { UserScreenService } from './user-screen.service';

describe('UserScreenService', () => {
  let service: UserScreenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserScreenService],
    }).compile();

    service = module.get<UserScreenService>(UserScreenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
