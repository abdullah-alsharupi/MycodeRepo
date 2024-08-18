import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Doctor } from "../types/types";

export const useGetDoctor = () => {
  return useQuery({
    queryKey: ["doctor"],
    queryFn: fetcDoctor,
  });
};

const fetcDoctor = async (): Promise<Doctor[]> => {
  const response = await axios.get(`http://localhost:8080/api/getDoctor`);
  if (!response.data) {
    throw new Error("Error");
  }
  return response.data;
};
