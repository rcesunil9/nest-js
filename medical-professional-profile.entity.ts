import { ApiProperty } from "@nestjs/swagger";
import mongoose from "mongoose";

export const MPProfileSchema = new mongoose.Schema({
    userId: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    medicalSpecialty: { type: String },
    education: { type: String },
    isGesy:{type: Boolean},
    profilePicture: { type: String },
    describeSelf: { type: String },
    Place : { type: String },
    faxNumber: { type: String },
    country : { type: String },
    region : { type: String },
    city: { type: String },
    zipCode: { type: String },
    street: { type: String },
    number : { type: Number },
    apartment: { type: String },
    floor: { type: String },
    providedServices: { type: String },
    averageExaminationTime: { type: String },
    avaliability: { type: String },
    week :{ type: String },
    time:{ type: Object },
})






export class MedicalProfessionalProfileStep3 {
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
}

export interface MPProfileSchema extends mongoose.Document {
    firstName:string,
    lastName:string,
    medicalSpecialty:string,
    education:string,
    isGesy:boolean,
    profilePicture:string,
    describeSelf:string,
    Place :string,
    faxNumber:string,
    country :string,
    region :string,
    city:string,
    zipCode:string,
    street:string,
    number : number,
    apartment:string,
    floor:string,
    providedServices:string,
    averageExaminationTime:string,
    avaliability:string,
    week :string,
    time:object
}

