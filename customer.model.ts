import * as mongoose from 'mongoose';

export const CustomerStep1Schema = new mongoose.Schema({
  email: { type: String, required: true },
  mode: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true },
  ssn: { type: String, required: true },
  birthDate: { type: String, required: true },
  // email: { type: String, required: true },
  step1: { type: String, required: true },
});

export interface CustomerStep1 extends mongoose.Document {
  id: string;
  email: string;
  mode: string;
  firstName: string;
  lastName: string;
  gender: string;
  ssn: string;
  birthDate: string;
  step1: string;
}

export const CustomerStep2Schema = new mongoose.Schema({
    email: { type: String, required: true },
    mode: { type: String, required: true },  
    country: { type: String, required: true },
    region: { type: String, required: true },
    city: { type: String, required: true },
    zipcode: { type: String, required: true },
    street: { type: String, required: true },
    number: { type: String, required: true },
    floor: { type: String, required: true },
    apartment: { type: String, required: true },
    step2: { type: String, required: true },
  });
  
  export interface CustomerStep2 extends mongoose.Document {
    id:string;
    email: string;
    mode: string;
    country: string;
    region: string;
    city: string;
    zipcode: string;
    street: string;
    number: string;
    floor: string;
    apartment: string;
    step2: string;
  }


  export const CustomerStep4Schema = new mongoose.Schema({
    email: { type: String, required: true },
    mode: { type: String, required: true }, 
    allergies: { type: String, required: false },
    chronicMedication: { type: String, required:  false},
    vaccines: { type: String, required: false },
    surgeries: { type: String, required: false },
    chronicDiseases: { type: String, required:  false},
    step4: { type: String, required: false },
  });
  
  export interface CustomerStep4 extends mongoose.Document {
    id: string;
    email: string;
    mode: string;
    allergies: string;
    chronicMedication: string;
    vaccines: string;
    surgeries: string;
    chronicDiseases: string;
    step4: string;
  }