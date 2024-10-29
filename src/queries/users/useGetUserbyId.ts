import { apifetch } from "@/api";
import { User } from "@/app/types/types";
import { useQuery } from "@tanstack/react-query";

export const useGetUsersbyId =(id:string,token:string) => {
  return useQuery({
    queryKey: ["user-id"],
    queryFn:async()=>{
      return await getUserbyId(id,token);
    }
  });
};

const getUserbyId = async (id:string,token:string): Promise<any> => {
  const response = await apifetch.get(`/user/id?id=${id}`,{headers:{Authorization:`Bearer ${token}`}});
  if (!response.data) {
    throw new Error("Error");
  }
  return response.data
};
