import {
    Controller,
    Post,
    Body,
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';
  
  import { CustomerService } from './customer.service';
  import {FileInterceptor} from '@nestjs/platform-express';
  import { Express } from 'express';
  
@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

  @Post("/step1")
  async addCustomerStep1(
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('gender') gender: string,
    @Body('ssn') ssn: string,
    @Body('birthDate') birthDate: string,
    
  ) {
    const mode="customer";
    const email="";
    const step1="1";
    const generatedId = await this.customerService.insertCustomerStep1(
      email,
      mode,
      firstName,
      lastName,
      gender,
      ssn,
      birthDate,
      step1,
    );
    return { id: generatedId };
  }

  @Post("/step2")
  async addCustomerStep2(
    @Body('country') country: string,
    @Body('region') region: string,
    @Body('city') city: string,
    @Body('zipcode') zipcode: string,
    @Body('street') street: string,
    @Body('number') number: string,
    @Body('floor') floor: string,
    @Body('apartment') apartment: string,
  ) {
    const mode="customer";
    const email="";
    const step2="2";
    const generatedId = await this.customerService.insertCustomerStep2(
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
    );
    return { id: generatedId };
  }
  @Post("/step4")
  async addCustomerStep4(
    @Body('allergies') allergies: string,
    @Body('chronicMedication') chronicMedication: string,
    @Body('vaccines') vaccines: string,
    @Body('suregries') surgeries: string,
    @Body('chronicDiseases') chronicDiseases: string,
  ) {
    const mode="customer";
    const email="";
    const step4="4";
    const generatedId = await this.customerService.insertCustomerStep4(
      email,
      mode,
      allergies,
      chronicMedication,
      vaccines,
      surgeries,
      chronicDiseases,
      step4,
    );
    return { id: generatedId };
  }


@Post('/uploadCustomerProfilePic')
@UseInterceptors(FileInterceptor('CustomerProfilePic'))
uploadFile(@UploadedFile() file: Express.Multer.File) {
  console.log(file);
}

}
