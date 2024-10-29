import { apifetch } from "@/api";
import { User } from "@/app/types/types";
import axios, { AxiosError } from "axios";

export const addUser=async(data:any,token:string)=>{

try {
    const response=await axios.post(`http://localhost:3000/api/user`,data)
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