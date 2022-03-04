import { ApiProperty } from "@nestjs/swagger"

export class MedicalProfessionalProfileStep1 {
    _id: string
    @ApiProperty()
    userId: string
    @ApiProperty()
    firstName: string
    @ApiProperty()
    lastName: string
    @ApiProperty()
    medicalSpecialty: string
    @ApiProperty()
    education: string
    @ApiProperty()
    isGesy:boolean
}

export class MedicalProfessionalProfileStep2 {
    @ApiProperty()
    profilePicture: string;

    @ApiProperty()
    describeSelf: string
}
export class MedicalProfessionalProfileStep3 {
    @ApiProperty()
    Place :string
    @ApiProperty()
    faxNumber:string
    @ApiProperty()
    country :string
    @ApiProperty()
    region :string
    @ApiProperty()
    city:string
    @ApiProperty()
    zipCode:string
    @ApiProperty()
    street:string
    @ApiProperty()
    number : number
    @ApiProperty()
    apartment:string
    @ApiProperty()
    floor:string
    @ApiProperty()
    providedServices:string
    @ApiProperty()
    averageExaminationTime:string
    @ApiProperty()
    avaliability:string
    @ApiProperty()
    week :string
    @ApiProperty()
    time:object
}