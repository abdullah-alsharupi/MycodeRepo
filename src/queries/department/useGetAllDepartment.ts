import { apifetch } from "@/api";
import { Department } from "@/app/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";



export const useGetDepartments =() => {
  return useQuery({
    queryKey: ["department"],
    queryFn:async()=>{
      return await getDepartment();
    }
  });
};

const getDepartment = async (): Promise<Department[]> => {
  const response = await axios.get(`http://localhost:3000/api/Department`);
  if (!response.data) {
    throw new Error("Error");
  }
  return response.data
};
