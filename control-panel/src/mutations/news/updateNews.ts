import { apifetch } from "@/api";
import { News } from "@/app/types/types";
import axios from "axios";
export const UpdateNews=async(data:any,id :string)=>{
    try {
        const response=await apifetch.put(`/News?id=${id}`,data)
    if(response.status!==200){

        throw new Error("error updating"+response.statusText)
    }
    return response
    } catch (error) {
        if (error && axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message);
          }
        console.error("erorr updating News",error);
        throw error
    }

}

