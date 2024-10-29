// models/User.ts

import { z } from "zod";
const phoneNumberRegex = /^[+]?[1-9]\d{1,14}$/;
export interface User {
  id: string; 
  userName: string; 
  email: string;
  password: string;
  createdAt?: Date|null
  updatedAt?: Date |null
  news: News[]
  role: string
}
export interface UpdateUser {
  id: string; 
  userName: string; 
  email: string;
  password: string;
  role: string

}

export const userZodSchema = z.object({
  userName: z.string().min(1,"name is require").max(100,"name is too long"),
  email: z.string().email(),
  password: z.string().min(4,"u must input at least 4").max(10,"password is too long"),
  roleName:z.string()
});
export type userType=z.infer<typeof userZodSchema>;

export interface CreateUser{
  userName: string; 
  email: string;
  password: string;
  roleName: string
}

export interface Permission {
  id: string; 
  action: string; 
  entity: string; 
  access: string; 
  createdAt: Date; 
  updatedAt: Date;
  roles: Role[]; 
  users: User[]; 
}


export interface Role {

  name: string;
 
}
  export interface News {
    id: string;
    headline: string;
    title: string;
    img: string;
    user: User;
    userId: string;
    department: Department;
    depID: string;
  }
  
  export interface Session {
    id: string;
    expirationDate: Date;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    userId: string;
  }
  
  export interface Department {
    id: string;
    depName: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    staffs: Staff[];
    doctors: Doctor[];
    news: News[];
  }
  
  export  interface Staff {
    id: string;
    staffName: string;
    phone: string | null;
    department: Department;
    depID: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
  }
  
  export interface Doctor {
    id: string;
    doctorName: string;
    phone: string | null;
    specialist: string;
    department: Department;
    depID: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    patient: Oppontement[];
    weekwork: Shift[];
  }
  
  export interface Patient {
    id: string;
    patName: string;
    address: string | null;
    gender: Gender | null;
    doctorBack: Date | null;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    doctor: Oppontement;
  }
  
  enum Gender {
    female,
    male
  }
  
  export interface Oppontement {
    doctor: Doctor;
    docID: string;
    patient: Patient;
    patID: string;
    createdAt: Date;
    date: Date;
    updatedAt: Date;
    isDeleted: boolean;
  }
  
  export interface Shift {
    id: string;
    day: Day;
    startTime: string;
    endTime: string;
    doctor: Doctor | null;
    docID: string;
  }
  
  enum Day {
    SUNDAY,
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY
  }