import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, Users } from 'src/users/users.model';
import { compare, hash, genSalt } from 'bcrypt';
import { MailerService } from "./mailer";
const crypto = require('crypto');

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailerService
  ) {}


  async register(createUserDto: CreateUserDto) {
    const hashed = await this.hashPassword(createUserDto['password']);
    createUserDto.password = hashed
    let user = await this.usersService.createUser(createUserDto);
    if(user){
      let data = this.sendOTP(user.mobile, user._id);
      return data;
    }
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    return hash(password, salt);
  }

  async signPayload(payload:string | object | Buffer) {
    return await this.jwtService.signAsync(payload);
  }

  async login(user: Users) {
      let User = this.usersService.sanitizeUser(user);
      if(User.isMobileVerify==true){
        let token= await this.signPayload({email:User.email,id:User._id})
        return {User,token};
      }
      else{
        return {message:"mobile number not verify"} 
      }
  }

  async sendOTP(mobile:string , id:string ) {
     let data=await this.usersService.sendOTP(mobile)
     if(data=='fail'){
       return {id, message:"Something went wrong!"}
     }
     return {id, message:"otpSentSuccess"}
  }

  async confirmPhoneNumber(userId: string, mobile: string, verificationCode: string) {
    let data =await this.usersService.confirmPhoneNumber(userId,mobile,verificationCode)
    return {...data,message:"successfuly registered"}
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user ) {
      if(await this.comparePassword(pass, user.password)){
        return user;
      }else{
        throw new HttpException(
          'Invalid email or password',
          HttpStatus.BAD_REQUEST,
        );
      }
    }else{
      throw new HttpException(
        'Email not found',
        HttpStatus.NO_CONTENT,
      );
    }
  }

  async comparePassword(
    providedPass: string,
    storedPass: string,
  ): Promise<boolean> {
      const passwordIsMatched = await compare(providedPass, storedPass);
      return passwordIsMatched;
  }

  async sendChangePasswordEmail(email:string){
        const user = await this.usersService.findOneByEmail(email);
        if(user){
            let counter = 0;
            let flag = true;
            let code = '';

            do {
              code += crypto.randomBytes(3).readUIntBE(0, 3);
              var token = code.slice(0, 4);
              let finduser = await this.usersService.findUserByResetPassToken(token);
              if (!finduser) {
                   flag = false;
              }
              counter++;
            } while (counter < 10 && flag);

            const res  = await this.usersService.setResetPassToken(user._id, token);
            if(res){
              this.mailService.sendMail(
                  "tfalcon@hellhalt.com",
                  email,
                  "Reset Password token",
                  "Confirmation code: "+token,
                  false
              );
              return {message:"Confirmation code sent to your email"}; 
            }
        }
  }

}