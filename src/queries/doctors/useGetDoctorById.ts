import { apifetch } from "@/api";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useGetDoctorById(id: string,token:string) {
  return useQuery({
    queryKey: [`getDoctorById`],
    queryFn: async () => {
      return await fetcDoctor(id,token);
    },
  });
}

const fetcDoctor = async (id: string,token:string): Promise<any> => {
  const response = await axios.get(`http://localhost:3000/api/Doctor/id?id=${id}`,{headers:{Authorization:`Bearer ${token}`}});
  if (!response.data) {
    throw new Error("Error");
  }
  return response.data;
};
