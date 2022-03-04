import { Test, TestingModule } from '@nestjs/testing';
import { MedicalProfessionalProfileService } from './medical-professional-profile.service';

describe('MedicalProfessionalProfileService', () => {
  let service: MedicalProfessionalProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicalProfessionalProfileService],
    }).compile();

    service = module.get<MedicalProfessionalProfileService>(MedicalProfessionalProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
