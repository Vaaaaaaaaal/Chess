import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export function authGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const token = sessionStorage.getItem("token");

  if (to.matched.some((record) => record.meta.requiresAuth) && !token) {
    next("/login");
  } else {
    next();
  }
}
