import { apifetch } from "@/api";
import { News } from "@/components/types/types";
import { useQuery } from "@tanstack/react-query";


export const useGetNews =() => {
  return useQuery({
    queryKey: ["news"],
    queryFn:async()=>{
      return await getNews();
    }
  });
};

const getNews = async (): Promise<News[]> => {
  const response = await apifetch.get(`get_news`);
  if (!response.data) {
    throw new Error("Error");
  }
  return response.data
};
