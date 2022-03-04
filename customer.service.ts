import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomerStep1, CustomerStep2, CustomerStep4 } from './customer.model';

@Injectable()
export class CustomerService {
    constructor(
        @InjectModel('CustomerStep1') private readonly customerStep1: Model<CustomerStep1>,
        @InjectModel('CustomerStep2') private readonly customerStep2: Model<CustomerStep2>,
        @InjectModel('CustomerStep4') private readonly customerStep4: Model<CustomerStep4>,
      ) {}
    
      async insertCustomerStep1(email: string,mode: string,firstName: string, lastName: string, gender: string,ssn: string, birthDate: string, step1: string) {
        const newCustomerStep1 = new this.customerStep1({
          email,
          mode,
          firstName,
          lastName,
          gender,
          ssn,
          birthDate,
          step1,
        });
        const result = await newCustomerStep1.save();
        return result.id as string;
      }

      async insertCustomerStep2(email: string,mode: string,country: string, region: string, city: string,zipcode: string, street: string, number: string,floor: string, apartment: string, step2: string) {
        const newCustomerStep2 = new this.customerStep2({
          email,
          mode,
          country,
          region,
          city,
          zipcode,
          street,
          number,
          floor,
          apartment,
          step2,
        });
        const result = await newCustomerStep2.save();
        return result.id as string;
      }

      async insertCustomerStep4(email: string,mode: string,allergies: string, chronicMedication: string, vaccines: string,surgeries: string, chronicDiseases: string, step4: string) {
        const newCustomerStep4 = new this.customerStep4({
          email,
          mode,
          allergies,
          chronicMedication,
          vaccines,
          surgeries,
          chronicDiseases,
          step4,
        });
        const result = await newCustomerStep4.save();
        return result.id as string;
      }



}
