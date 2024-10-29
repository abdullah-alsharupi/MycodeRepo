"use client"

import { apifetch } from "@/api";
import { Doctor } from "@/app/types/types";
import axios from "axios";
import { headers } from "next/headers";

export const doctorDelete=async(id:string,token:string)=>{

    try {
        const response=await axios.put(`http://localhost:3000/api/Doctor/id`,{id:`${id}`},{headers:{Authorization:`Bearer ${token}`}})
    if(response.status!==200){
        throw new Error(`خطأ في حذف الدكتور`+response.statusText)
    }
    return response.data 
    } catch (error) {
        if(error&&axios.isAxiosError(error))
        {
         throw new Error(error.response?.data.message)
        }
         throw error
     }
}