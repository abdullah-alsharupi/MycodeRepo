import { apifetch } from "@/api";
import { updatedepar } from "@/components/types/types";

export const updateDepartment=async(data:updatedepar,id:string)=>{

    try {
        const response=await apifetch.post(`/update_depart/${id}`,data)
    if(response.status!==200){
        throw new Error("erorr updating "+response.statusText)
    }
    return response.data
    } catch (error:any) {
        console.error("erorr updating",error);
        throw error
    }
}