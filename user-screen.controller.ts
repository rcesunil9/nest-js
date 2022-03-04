import {
    Controller,
    Get,
  } from '@nestjs/common';
  import { UserScreenService } from './user-screen.service';
@Controller('user-screen')
export class UserScreenController {
    constructor(private readonly userScreenService: UserScreenService) {}

    @Get()
    async getAlldoctors() {
      const doctors = await this.userScreenService.getDoctors();
      return doctors;
    }
}
