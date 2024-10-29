import { apifetch } from "@/api";

import axios, { AxiosError } from "axios";

export const Doctorr=async(data:any)=>{

try {
    const response=await apifetch.post("/addingDoctor",data)
    if(response.status!==200){

        throw new Error("error adding User"+response.statusText)
    }
} catch (error) {
   if(error&&axios.isAxiosError(error))
   {
    throw new Error(error.response?.data.message)
   }
    throw error
}

}