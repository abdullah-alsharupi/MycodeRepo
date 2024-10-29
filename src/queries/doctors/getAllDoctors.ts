import { apifetch } from "@/api";
import { Doctor } from "@/app/types/types";
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

const fetcDoctor = async (): Promise<any> => {
  const response = await axios.get(`http://localhost:3000/api/Doctor`);
  if (!response.data) {
    throw new Error("Error");
  }
  return response.data
};

