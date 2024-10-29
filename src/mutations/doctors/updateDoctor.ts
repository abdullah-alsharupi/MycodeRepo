import { apifetch } from "@/api";
import { Doctor } from "@/app/types/types";
import axios from "axios";
export const doctroUpdate=async(data:any,id:string ,token:string)=>{
    try {
      
        //const response=await apifetch.put(`/updateDoctor/${id}`,data,{headers:{Authorization:`Bearer ${token}`}})
        const response = await axios.put(`http://localhost:3000/api/Doctor?id=${id}`,data);
   
    
    } catch (error) {
        if(error&&axios.isAxiosError(error))
        {
         throw new Error(error.response?.data.message)
        }
         throw error
     }

}