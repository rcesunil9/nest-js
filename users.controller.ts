import { Controller, UseGuards,Request, Body, Post,Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';
import * as phoneToken from 'generate-sms-verification-code';
import { Roles } from 'src/decorators/role.decorators';
import { Role } from 'src/enum/entities.role.enum';
import { CodeVerfyDto, CreateUserDto, Users } from './users.model';
import { ApiTags } from '@nestjs/swagger';

/** start**/
@ApiTags('User')
@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}


  



  @Get('all')
  findAll() {
    return this.usersService.findAll();
  }






  /* @Post('/signup')
  async addUser(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('mobile') mobile: string,
    @Body('mode') mode: string,
  ) {
    const userid=phoneToken(4);
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    const generatedId = await this.usersService.SignupUser(
      userid,
      email,
      hash,
      mobile,
      mode,
    );

    await this.usersService.sendSMS(mobile);
    return { id: generatedId };
  }

  @UseGuards(AuthGuard('local'))
  @Post('/verifyToken')
  async login(@Request() req) {
    const code =await this.usersService.getCode(req.userid)
    if (code)
    return code;
  }
 */
 

 
}