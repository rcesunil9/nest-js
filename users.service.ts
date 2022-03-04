import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, Users } from './users.model';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';
import { Twilio } from 'twilio';

@Injectable()
export class UsersService {
  private twilioClient: Twilio;

  constructor(
    @InjectModel('Users') private readonly usersModel: Model<Users>,
    @InjectTwilio() private readonly client: TwilioClient,


  ) {

    var accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
    var authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console
    this.twilioClient = new Twilio(accountSid, authToken);
  }

  async createUser(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const user = await this.usersModel.findOne({ email });
    if (user) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }

    const newUser = new this.usersModel({
      email: createUserDto.email,
      password: createUserDto.password,
      mobile: createUserDto.mobile,
      role: createUserDto.role,
      isMobileVerify:false,
      acceptedTerms: createUserDto.acceptedTerms
    });
    const result = await newUser.save();
    return this.sanitizeUser(result);
  }
  // return user object without password
  sanitizeUser(user:Users) {
    const {password , ...rest} = JSON.parse(JSON.stringify(user));
    return rest;
  }

  async findAll() {
    let data = this.usersModel.find()
    return data
  }
  async findOneByEmail(email: string) {
    let data = await this.usersModel.findOne({email: email})
    return data
  }
  async findOneById(idObj) {
    let data = await this.usersModel.findOne(idObj)
    return data
  }
  async sendOTP(mobile:string) {
    try {
      const verification = await this.twilioClient.verify.services(process.env.TWILIO_VERIFICATION_SERVICE_SID)
        .verifications
        .create({ to: `+${mobile}`, channel: 'sms' })
      console.log("verfication", verification)
      return verification
    } catch (e) {
      console.log("error", e)
      return "fail";
    }
  }
  async confirmPhoneNumber(userId: string, mobile: string, verificationCode: string) {
    const result = await this.twilioClient.verify.services(process.env.TWILIO_VERIFICATION_SERVICE_SID)
      .verificationChecks
      .create({ to: `+${mobile}`, code: verificationCode })

    console.log(result);

    if (!result.valid || result.status !== 'approved') {
      throw new BadRequestException('Wrong code provided');
    }

    await this.usersModel.findOneAndUpdate({ _id: userId }, { isMobileVerify: true });
    let user = await this.findOneById({ _id: userId });
    if(user){
      return this.sanitizeUser(user);
    }
    
  }




  async getCode(id) {
    const code = await this.usersModel.exists({ userid: id });
    return code;

  }

  async sendSMS(mobile) {
    try {
      return await this.client.messages.create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: mobile,
      });
    } catch (e) {
      return e;
    }
  }

  async findUserByResetPassToken(token:string){
    return await this.usersModel.findOne({
        reset_pwd_token: token
    });
  }

  async setResetPassToken(id:string, token:string){
    return await this.usersModel.findOneAndUpdate(
          { _id: id },
          {
            reset_pwd_token: token,
          },
    );
  }

  async resetPassword(id:string, password:string){
      return await this.usersModel.findOneAndUpdate(
          { _id: id },
          {
              password: password,
              reset_pwd_token: null,
          },
      );
  }

}

