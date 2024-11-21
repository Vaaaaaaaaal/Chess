import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

export function useAuth() {
  const error = ref("");
  const isLoading = ref(false);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      isLoading.value = true;
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      const { token, userId, username } = response.data;

      // Stockage du token en session
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("userId", userId.toString());
      sessionStorage.setItem("username", username);

      // Configuration du header Authorization pour les futures requêtes
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      router.push("/");
      return response.data;
    } catch (err: any) {
      error.value = err.response?.data?.message || "Erreur de connexion";
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("username");
    delete axios.defaults.headers.common["Authorization"];
    router.push("/login");
  };

  return {
    login,
    logout,
    error,
    isLoading,
  };
}
