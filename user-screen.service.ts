import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

//import { Doctors } from './doctors.model';

@Injectable()
export class UserScreenService {
    constructor(
        //@InjectModel(/*DoctorsModel*/'') private readonly doctorsModel: /*Model<//Doctors>*/any,
      ) {}
      async getDoctors() {
        //const doctors = await this.doctorsModel.find().exec();
        /*return doctors.map(doc => ({
          id: doc.id,
          firstName: doc.firstName,
          lastName: doc.lastName,
          profession: doc.profession,
          education: doc.education,
          location: doc.location,
          avaliability: doc.avaliability,
          favorite:doc.favorite,
          services: doc.services,
          about: doc.about,
        }));*/
        return "hello";
      }

}
