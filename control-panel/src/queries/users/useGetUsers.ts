import { apifetch } from "@/api";
import { User } from "@/components/types/types";
import { useQuery } from "@tanstack/react-query";

export const useGetUsers =() => {
  return useQuery({
    queryKey: ["users"],
    queryFn:async()=>{
      return await GetUsers();
    }
  });
};

const GetUsers = async (): Promise<User[]> => {
  const response = await apifetch.get(`auth/getUsers`);
  if (!response.data) {
    throw new Error("Error");
  }
  return response.data
};
