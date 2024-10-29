import { apifetch } from "@/api";
import { User } from "@/app/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetUsers =(token:string) => {
  return useQuery({
    queryKey: ["users"],
    queryFn:async()=>{
      const response =await apifetch.get(`user`,{headers:{Authorization:`Bearer ${token}`}});
      if (!response.data) {
        throw new Error("Error");
      }
      return response.data
    }
  });
};

const GetUsers = async (token:string): Promise<User[]> => {
  const response =await apifetch.get(`user`,{headers:{Authorization:`Bearer ${token}`}});
  if (!response.data) {
    throw new Error("Error");
  }
  return response.data
};
