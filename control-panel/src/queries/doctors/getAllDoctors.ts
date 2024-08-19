import { apifetch } from "@/api";
import { DoctorType } from "@/components/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export const useGetDoctor =() => {
  return useQuery({
    queryKey: ["doctor"],
    queryFn:async()=>{
      return await fetcDoctor();
    }
  });
};

const fetcDoctor = async (): Promise<DoctorType[]> => {
  const response = await apifetch.get(`getDoctor`);
  if (!response.data) {
    throw new Error("Error");
  }
  return response.data
};
