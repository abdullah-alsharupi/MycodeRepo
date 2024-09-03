export interface User {
    id: string| null;
    userName: string| null;
    email: string| null;
    password: string| null;
    sessions: Session[]| null;
    createdAt: Date| null;
    updatedAt: Date| null;
    isDeleted: boolean| null;
    news: News[]| null;
  }
  
  export interface News {
    id: string| null;
    headline: string| null;
    title: string| null;
    img: string| null;
    user: User| null;
    userId: string| null;
    department: Department| null;
    depID: string| null;
  }
  
  export interface Session {
    id: string| null;
    expirationDate: Date| null;
    createdAt: Date| null;
    updatedAt: Date| null;
    user: User| null;
    userId: string| null;
  }
  
  export interface Department {
    id: string| null;
    depName: string| null;
    createdAt: Date| null;
    updatedAt: Date| null;
    isDeleted: boolean| null;
    staffs: Staff[]| null;
    doctors: DoctorType[]| null;
    news: News[]| null;
  }
  
  export  interface Staff {
    id: string| null;
    staffName: string| null;
    phone: string | null| null;
    department: Department| null;
    depID: string| null;
    createdAt: Date| null;
    updatedAt: Date| null;
    isDeleted: boolean| null;
  }
  
  export interface DoctorType {
    id: string| null;
    doctorName: string| null;
    phone: string | null| null;
    specialist: string| null;
    department: Department[]| null;
    depID: string| null;
    createdAt: Date| null;
    updatedAt: Date| null;
    isDeleted: boolean| null;
    patient: Oppontement[]| null;
    weekwork: Shift[]| null;
  }
  
  export interface Patient {
    id: string| null;
    patName: string| null;
    address: string | null| null;
    gender: Gender | null| null;
    doctorBack: Date | null| null;
    phone: string| null;
    createdAt: Date| null;
    updatedAt: Date| null;
    isDeleted: boolean| null;
    doctor: Oppontement[]| null;
  }
  
  enum Gender {
    female,
    male
  }
  
  export interface Oppontement {
    doctor: DoctorType| null;
    docID: string| null;
    patient: Patient| null;
    patID: string| null;
    createdAt: Date| null;
    date: Date| null;
    updatedAt: Date| null;
    isDeleted: boolean| null;
  }
  
  export interface Shift {
    id: string| null;
    day: Day| null;
    startTime: string| null;
    endTime: string| null;
    doctor: DoctorType | null| null;
    docID: string| null;
  }
  
export  enum Day {
    SUNDAY,
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY
  }
  export interface updatedepar{
    
    depName: string| null;
  }