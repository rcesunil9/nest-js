import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MedicalProfessionalProfileStep1, MedicalProfessionalProfileStep2, MedicalProfessionalProfileStep3 } from './dto/create-medical-professional-profile.dto';
import { UpdateMedicalProfessionalProfileDto } from './dto/update-medical-professional-profile.dto';
import { MPProfileSchema } from './entities/medical-professional-profile.entity'
import { Model } from 'mongoose';
import * as fs from 'fs';
import path from 'path';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class MedicalProfessionalProfileService {
  constructor(@InjectModel('medical-professional-profile') private readonly medicalProfessionalModel: Model<MPProfileSchema>,
    private userService: UsersService
  ) { }

  async createStep1(user, createMedicalProfessionalProfileDto: MedicalProfessionalProfileStep1) {
    try {
      const userProfileData = await this.findOne(user.userId)
      if (!userProfileData) {
        const profileModel = await this.medicalProfessionalModel.create(createMedicalProfessionalProfileDto)
        return profileModel.save();
      }
      else {
        console.log("userProfileData", userProfileData)
        await this.medicalProfessionalModel.updateOne({ _id: userProfileData._id }, createMedicalProfessionalProfileDto)
      }
    }
    catch (e) {
      console.log("error:", e)
    }
  }

  async createStep2(user, file: Express.Multer.File, createCatDto: { describeSelf: string, profilePicture: Buffer }) {
    const userProfileData = await this.findOne(user.userId)
    var obj = {
      describeSelf: createCatDto.describeSelf,
      profilePicture: file.filename
    }

    await this.medicalProfessionalModel.updateOne({ _id:userProfileData._id}, {...obj});
    fs.unlink(`./uploads/files/${userProfileData.profilePicture}`,(err) => {
      console.log(err,'path/file.txt was deleted')}) 
    return "success"
  }
  async createStep3(user,createMedicalProfessionalProfileDto: MedicalProfessionalProfileStep3) {
    const userProfileData = await this.findOne(user.userId)

    await this.medicalProfessionalModel.updateOne({ _id:userProfileData._id}, {...createMedicalProfessionalProfileDto});
    return "success"
  }

  create(createMedicalProfessionalProfileDto: MedicalProfessionalProfileStep1) {
    return 'This action adds a new medicalProfessionalProfile';
  }

  async findAll(user) {
    return await await this.medicalProfessionalModel.findOne({ userId:user.userId });
  }

  async getProfile(_id: string, res) {
    const data = await this.medicalProfessionalModel.findOne({ _id });
    res.sendFile(data.profilePicture, { root: './uploads/files' })
  }
  async findOne(_id: string) {
    return await this.medicalProfessionalModel.findOne({ userId: _id });

  }

  update(id: number, updateMedicalProfessionalProfileDto: UpdateMedicalProfessionalProfileDto) {
    return `This action updates a #${id} medicalProfessionalProfile`;
  }

  remove(id: number) {
    return `This action removes a #${id} medicalProfessionalProfile`;
  }
}
