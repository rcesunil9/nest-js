import { HttpException, Body, Controller, Post, UseGuards, Req, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Roles } from "src/decorators/role.decorators";
import { Role } from "src/enum/entities.role.enum";
import { CodeVerfyDto, CreateUserDto, forgetPasswordDTO, ResetPasswordDto, Users } from "src/users/users.model";
import { AuthService } from "./auth.service";
import { SendOTPDto } from "./dto/send-otp.dto";
import { LocalAuthGuard } from "./local-auth.guard";
import { Request } from 'express';
import { UsersService } from "src/users/users.service";
import { MailerService } from "./mailer";
import { JwtAuthGuard } from "./jwt-auth.guard";
const crypto = require('crypto');

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private mailService: MailerService,
  ) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    try{
      return this.authService.register(createUserDto);
    }catch(error){
      if(typeof error == 'object' && error instanceof HttpException){
        throw error;
      }else{
        console.log(error);
      }
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('signIn')
  login(@Req() req) {
    //console.log(user);
    try{
      return this.authService.login(req.user);
    }catch(error){
      if(typeof error == 'object' && error instanceof HttpException){
        //console.log('test');
        throw error;
      }else{
        console.log(error);
      }
    }
  }

  @Post('sendOtp')
  async sendOTP(@Body() sendOtpDto :SendOTPDto) {
    const code = await this.authService.sendOTP(sendOtpDto.mobile,sendOtpDto.id)
    if (code)
    return code;
  }  

  @Post('verifyOtp')
  async verifysendOTP(@Body() codeVerify :CodeVerfyDto ) {
    try{
      const verfyData =await this.authService.confirmPhoneNumber(codeVerify.id,codeVerify.mobile,codeVerify.code)
      if (verfyData)
      return verfyData;
    }catch(error){
      if(typeof error == 'object' && error instanceof HttpException){
        throw error;
      }else{
        console.log(error);
      }
    }
  } 

  @Post('forgetPassword')
  async forgetPassword(@Body() forgetPass :forgetPasswordDTO ) {
    try{
      let { email } = forgetPass;
      return await this.authService.sendChangePasswordEmail(email);
    }catch(error){
      if(typeof error == 'object' && error instanceof HttpException){
        throw error;
      }else{
        console.log(error);
      }
    }
  }

  @Post('resetPassword')
  async resetPassword(@Body() resetPass: ResetPasswordDto) {
    try{
      let { password, token } = resetPass;
      let newpassword = { password, token };
      const user = await this.usersService.findUserByResetPassToken(newpassword.token);
      if(user){
            const password = await this.authService.hashPassword(
                newpassword.password,
              );
            const res  = await this.usersService.resetPassword(user._id, password);
            if(res){
              this.mailService.sendMail(
                  "tfalcon@hellhalt.com",
                  user.email,
                  "Password resetted",
                  "Password has been changed successfully",
                  false
              );
              return {message:"Password has been changed successfully"}; 
            }
      }
    }catch(error){
      if(typeof error == 'object' && error instanceof HttpException){
        throw error;
      }else{
        console.log(error);
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('changePassword')
  async changePassword(@Req() req) {
    try{
        let email = req.user.email;
        return await this.authService.sendChangePasswordEmail(email);
    }catch(error){
      if(typeof error == 'object' && error instanceof HttpException){
        throw error;
      }else{
        console.log(error);
      }
    }
  }

}