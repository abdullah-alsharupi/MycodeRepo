import { apifetch } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { News } from "@/app/types/types";
import axios from "axios";


export const useGetNews =() => {
  return useQuery({
    queryKey: ["news"],
    queryFn:async()=>{
      return await getNews();
    }
  });
};

const getNews = async (): Promise<News[]> => {
   const response = await axios.get(`http://localhost:3000/api/News`);
  if (!response.data) {
    throw new Error("Error");
  }
  return response.data
};
