import { apifetch } from "@/api";
export const deletDepartment=async(id:string)=>{
const response=await apifetch.delete(`/delete_depart/${id}`)
try {
    if(response.status!==200){
        throw new Error("error deleting"+response.statusText)
    }
    return response.data
} catch (error) {
    console.error("erorr deleting ",error);
    throw error
}


}