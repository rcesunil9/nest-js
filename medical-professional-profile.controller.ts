import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, Res, UseInterceptors, UseGuards } from '@nestjs/common';
import { MedicalProfessionalProfileService } from './medical-professional-profile.service';
import { MedicalProfessionalProfileStep1, MedicalProfessionalProfileStep2, MedicalProfessionalProfileStep3 } from './dto/create-medical-professional-profile.dto';
import { UpdateMedicalProfessionalProfileDto } from './dto/update-medical-professional-profile.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CurrentUser } from 'src/decorators/current-user.decorators';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/enum/entities.role.enum';

@ApiTags('Medical Professional profile')
@Controller('medical-professional-profile')
export class MedicalProfessionalProfileController {
  constructor(private readonly medicalProfessionalProfileService: MedicalProfessionalProfileService) {}
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('step1')
  createStep1(@CurrentUser()user,@Body() createMedicalProfessionalProfileDto: MedicalProfessionalProfileStep1) {
    return this.medicalProfessionalProfileService.createStep1(user,createMedicalProfessionalProfileDto);
  }
  @Post('step2')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('profilePicture', {
    storage: diskStorage({
    destination: './uploads/files',
    filename: (req, file, cb) => {
       const randomName = Array(32).fill(null).map(() => 
      (Math.round(Math.random() * 16)).toString(16)).join('');
        return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
     }))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        describeSelf: { type: 'string' },
        profilePicture: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  
  createStep2(@CurrentUser()user,@UploadedFile() file: Express.Multer.File, @Body() createMedicalProfessionalProfileDto) {
    return this.medicalProfessionalProfileService.createStep2(user,file,createMedicalProfessionalProfileDto);
  }
 

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('step3')
  createStep3(@CurrentUser()user,@Body() createMedicalProfessionalProfileDto: MedicalProfessionalProfileStep3) {
    return this.medicalProfessionalProfileService.createStep3(user,createMedicalProfessionalProfileDto);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  findAll(@CurrentUser() user) {
    return this.medicalProfessionalProfileService.findAll(user);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile-picture/:id')
  getProfile(@Param('id') id: string , @Res() res) {
    return this.medicalProfessionalProfileService.getProfile(id,res);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMedicalProfessionalProfileDto: UpdateMedicalProfessionalProfileDto) {
  //   return this.medicalProfessionalProfileService.update(+id, updateMedicalProfessionalProfileDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.medicalProfessionalProfileService.remove(+id);
  // }
}
