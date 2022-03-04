import { PartialType } from '@nestjs/swagger';
import { MedicalProfessionalProfileStep1 } from './create-medical-professional-profile.dto';

export class UpdateMedicalProfessionalProfileDto extends PartialType(MedicalProfessionalProfileStep1) {}
