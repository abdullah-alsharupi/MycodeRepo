"use client"

import { apifetch } from "@/api";
import { Doctor } from "@/app/types/types";
import axios from "axios";

export const patientDelete=async(id:string)=>{

    try {
        const response=await axios.put(`http://localhost:3000/api/patient/id`,{id:`${id}`})
    if(response.status!==200){
        throw new Error(`خطأ في حذف اسم المريض`+response.statusText)
    }
    return response.data
    } catch (error) {
        console.error(`خطأ في حذف اسم المريض`,error);
        throw error
    }
}