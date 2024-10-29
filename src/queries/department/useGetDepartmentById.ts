import { apifetch } from "@/api";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { headers } from "next/headers";


export default function useGetDepartmentById (id:string,token?:any)  {
  return useQuery({
    queryKey: ["departments"],
    queryFn:async()=>{
      return await fetcDoctor(id);
    }
  });
};

const fetcDoctor = async (id:string): Promise<any> => {
  const response = await axios.get(`http://localhost:3000/api/Department/id?id=${id}`,{headers:{Authorization:`Bearer ${""}`}});
  if (!response.data) {
    throw new Error("Error");
  }
  return response.data
};
