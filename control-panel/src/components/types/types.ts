export interface User {
    id: string;
    userName: string;
    email: string;
    password: string;
    sessions: Session[];
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    news: News[];
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
    doctor: Oppontement[];
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