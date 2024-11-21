import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/game",
    name: "game",
    component: () => import("../views/GameView.vue"),
  },
  {
    path: "/profile/edit",
    name: "editProfile",
    component: () => import("../views/EditProfileView.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/rank",
    name: "rank",
    component: () => import("../views/RankView.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/ProfileDetailView.vue"),
  },
  {
    path: "/game/replay/:id",
    name: "game-replay",
    component: () => import("../views/GameReplayView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
