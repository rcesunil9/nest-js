import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersSchema } from './users.model';
import { TwilioModule } from 'nestjs-twilio';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(),MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema }]),TwilioModule.forRoot({
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
  })],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersModule,UsersService],
})
export class UsersModule {}