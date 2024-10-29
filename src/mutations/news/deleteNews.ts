import { apifetch } from "@/api";
import axios from "axios";

export const deleteNews=async(id: string)=>{

    try {
        const response=await axios.put(`http://localhost:3000/api/News/id`,{id:`${id}`})
    if(response.status!==200){
        throw new Error("error delete News"+response.statusText)
    }
    return response.data
    } catch (error) {
        if(error&&axios.isAxiosError(error)){
            throw new Error(error.response?.data.message)
        }
      
        throw error
    }
}