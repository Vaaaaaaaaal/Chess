import type { UserRegistration } from "@/types/user";
import { ref } from "vue";
import { userApi } from "./userApi";

export function useUserService() {
  const error = ref<string>("");
  const isLoading = ref<boolean>(false);

  const register = async (userData: UserRegistration) => {
    isLoading.value = true;
    error.value = "";

    try {
      if (userData.password !== userData.confirmPassword) {
        throw new Error("Les mots de passe ne correspondent pas");
      }

      const result = await userApi.register({
        username: userData.username,
        email: userData.email,
        password: userData.password,
      });

      return result;
    } catch (err: any) {
      error.value = err.message;
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    error,
    isLoading,
    register,
  };
}
