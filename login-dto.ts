import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class LoginDTO{
    @ApiProperty()
    @IsNotEmpty()
    email:string
    
    @ApiProperty()
    @IsNotEmpty()
    password:string
}