import { HttpException, HttpStatus, Module } from '@nestjs/common';
import { MedicalProfessionalProfileService } from './medical-professional-profile.service';
import { MedicalProfessionalProfileController } from './medical-professional-profile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MPProfileSchema } from './entities/medical-professional-profile.entity';
import { extname } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';

const imageFilter = function (req, file, cb) {
  // accept image only
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
  }
  cb(null, true);
};
@Module({
  imports:[MongooseModule.forFeature([{ name: 'medical-professional-profile', schema: MPProfileSchema }]),
  // MulterModule.registerAsync({
  //   useFactory: () => ({
  //     fileFilter: imageFilter 
  //   }),
  // }),
  UsersModule
  
],
  controllers: [MedicalProfessionalProfileController],
  providers: [MedicalProfessionalProfileService]
})
export class MedicalProfessionalProfileModule {}
