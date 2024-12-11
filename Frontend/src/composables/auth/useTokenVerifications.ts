import axiosInstance from "@/utils/axios";

export function useTokenVerification() {
  const verifyToken = async (): Promise<boolean> => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.log("❌ Pas de token trouvé");
        return false;
      }

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      const response = await axiosInstance.get("/auth/verify");
      console.log("✅ Token vérifié avec succès");
      return true;
    } catch (error) {
      console.error("❌ Erreur de vérification du token:", error);
      return false;
    }
  };

  return {
    verifyToken,
  };
}
