import axios from "axios";
import { onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";

export function useAuth() {
  const error = ref("");
  const isLoading = ref(false);
  const router = useRouter();
  let refreshTokenInterval: NodeJS.Timeout | null = null;

  const refreshToken = async () => {
    try {
      const currentToken = sessionStorage.getItem("token");
      if (!currentToken) return;

      const response = await axios.post(
        "http://localhost:3000/auth/refresh",
        {},
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        }
      );

      const { token, userId, username } = response.data;

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("userId", userId.toString());
      sessionStorage.setItem("username", username);

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (err: any) {
      console.error("Erreur lors du rafraîchissement du token:", err);
      logout();
    }
  };

  const startTokenRefresh = () => {
    const REFRESH_INTERVAL = 19 * 60 * 1000;

    if (refreshTokenInterval) {
      clearInterval(refreshTokenInterval);
    }

    refreshTokenInterval = setInterval(refreshToken, REFRESH_INTERVAL);
  };

  const login = async (email: string, password: string) => {
    try {
      isLoading.value = true;
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      const { token, userId, username } = response.data;

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("userId", userId.toString());
      sessionStorage.setItem("username", username);

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Démarrer le rafraîchissement automatique après la connexion
      startTokenRefresh();

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
    if (refreshTokenInterval) {
      clearInterval(refreshTokenInterval);
      refreshTokenInterval = null;
    }

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("username");
    delete axios.defaults.headers.common["Authorization"];
    router.push("/login");
  };

  // Démarrer le rafraîchissement si un token existe déjà
  onMounted(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      startTokenRefresh();
    }
  });

  // Nettoyer l'intervalle lors de la destruction du composant
  onUnmounted(() => {
    if (refreshTokenInterval) {
      clearInterval(refreshTokenInterval);
    }
  });

  return {
    login,
    logout,
    error,
    isLoading,
  };
}
