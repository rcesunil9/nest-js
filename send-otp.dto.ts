import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class SendOTPDto{
    @ApiProperty()
    @IsNotEmpty()
    id:string

    @ApiProperty()
    @IsNotEmpty()
    mobile:string
}