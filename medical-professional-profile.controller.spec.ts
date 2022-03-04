import { Test, TestingModule } from '@nestjs/testing';
import { MedicalProfessionalProfileController } from './medical-professional-profile.controller';
import { MedicalProfessionalProfileService } from './medical-professional-profile.service';

describe('MedicalProfessionalProfileController', () => {
  let controller: MedicalProfessionalProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalProfessionalProfileController],
      providers: [MedicalProfessionalProfileService],
    }).compile();

    controller = module.get<MedicalProfessionalProfileController>(MedicalProfessionalProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
