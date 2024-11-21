import { useTokenVerification } from "@/composables/auth/useTokenVerifications";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export async function authGuard(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const publicRoutes = ["home", "login", "register", "not-found"];

  if (publicRoutes.includes(to.name as string)) {
    console.log("🔓 Route publique, accès autorisé");
    next();
    return;
  }

  const { verifyToken } = useTokenVerification();
  const isValidToken = await verifyToken();

  if (isValidToken) {
    console.log("✅ Token valide, accès autorisé");
    next();
  } else {
    console.log("❌ Token invalide, redirection vers login");
    next("/login");
  }
}
