import { UserRegistration } from "@/types/user";
import axiosInstance from "@/utils/axios";

export const userApi = {
  register: async (userData: UserRegistration) => {
    try {
      const response = await axiosInstance.post("/auth/register", userData);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Erreur lors de l'inscription"
      );
    }
  },

  getUserProfile: async (userId: number) => {
    const response = await axiosInstance.get(`/users/${userId}`);
    return response.data;
  },

  updateUserProfile: async (
    userId: number,
    userData: Partial<UserRegistration>
  ) => {
    const response = await axiosInstance.put(`/users/${userId}`, userData);
    return response.data;
  },
};
