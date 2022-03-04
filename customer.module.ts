import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerStep1Schema, CustomerStep2Schema, CustomerStep4Schema } from './customer.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'CustomerStep1', schema: CustomerStep1Schema }]),
    MongooseModule.forFeature([{ name: 'CustomerStep2', schema: CustomerStep2Schema }]),
    MongooseModule.forFeature([{ name: 'CustomerStep4', schema: CustomerStep4Schema }]),
  ],
  providers: [CustomerService],
  controllers: [CustomerController]
})
export class CustomerModule {}
