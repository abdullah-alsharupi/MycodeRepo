import { apifetch } from "@/api";
import { Department } from "@/components/types/types";
import { useQuery } from "@tanstack/react-query";



export const useGetDepartments =() => {
  return useQuery({
    queryKey: ["department"],
    queryFn:async()=>{
      return await getDepartment();
    }
  });
};

const getDepartment = async (): Promise<Department[]> => {
  const response = await apifetch.get(`get_depart`);
  if (!response.data) {
    throw new Error("Error");
  }
  return response.data
};
