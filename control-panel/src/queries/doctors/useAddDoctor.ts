import { apifetch } from "@/api";
import { DoctorType } from "@/components/types/types"; // Assuming DoctorType defines doctor data

export const useAddDoctor = async (data: DoctorType) => {
  try {
    // Validate data (consider using a validation library)
    // if (!isValidDoctorData(data)) { // Replace `isValidDoctorData` with your validation logic
    //   throw new Error("Invalid doctor data");
    // }

    const response = await apifetch.post(`addDoctor`, data);

    if (response.status!==200) {
      throw new Error("Error adding doctor: " + response.statusText);
    }

    return response.data; // Assuming response contains added doctor data
  } catch (error: any) {
    console.error("Error adding doctor:", error);
    throw error; // Re-throw for handling in your component
  }
};