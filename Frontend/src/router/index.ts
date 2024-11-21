import NotFoundView from "@/views/NotFoundView.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { requiresAuth: false },
  },
  {
    path: "/game",
    name: "game",
    component: () => import("../views/GameView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/profile/edit",
    name: "editProfile",
    component: () => import("../views/EditProfileView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterView.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/rank",
    name: "rank",
    component: () => import("../views/RankView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/ProfileDetailView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/game/replay/:id",
    name: "game-replay",
    component: () => import("../views/GameReplayView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFoundView,
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
