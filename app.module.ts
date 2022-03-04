import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomerModule } from './customer/customer.module';
import { AuthModule } from './auth/auth.module';
import { UserScreenService } from './user-screen/user-screen.service';
import { UserScreenController } from './user-screen/user-screen.controller';
import { MedicalProfessionalProfileModule } from './medical-professional-profile/medical-professional-profile.module';
import * as Joi from 'joi';
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [ConfigModule.forRoot(/*{
    validationSchema: Joi.object({
      TWILIO_ACCOUNT_SID: Joi.string().required(),
      TWILIO_AUTH_TOKEN: Joi.string().required(),
      TWILIO_VERIFICATION_SERVICE_SID: Joi.string().required()
      // ...
    })
  }*/),
  MulterModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      dest: configService.get('MULTER_DEST'),
    }),
    inject: [ConfigService],
  }),
  MongooseModule.forRoot(process.env.MONGO_URI),
    UsersModule,
    CustomerModule,
    AuthModule,
    MedicalProfessionalProfileModule,
  ],
  

  controllers: [AppController, UserScreenController],
  providers: [AppService, UserScreenService],

})
export class AppModule { }
