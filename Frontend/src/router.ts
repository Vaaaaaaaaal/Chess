import { useAuthStore } from '@/stores/authStore';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('./views/LoginView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('./views/RegisterView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('./views/HomeView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/game',
      name: 'Game',
      component: () => import('./views/GameView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/stats',
      name: 'Stats',
      component: () => import('./views/StatsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('./views/AccountView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/history/:userId',
      name: 'History',
      component: () => import('./views/HistoryView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/history/me',
      name: 'MyHistory',
      component: () => import('./views/HistoryView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/leaderboard',
      name: 'Leaderboard',
      component: () => import('./views/LeaderboardView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/replay/:gameId',
      name: 'Replay',
      component: () => import('./views/ReplayView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/stats/me',
      name: 'MyStats',
      component: () => import('./views/StatsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/stats/:userId',
      name: 'UserStats',
      component: () => import('./views/StatsView.vue'),
      meta: { requiresAuth: false },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } else if (to.path === '/login' && authStore.isAuthenticated) {
    next('/profile');
  } else {
    next();
  }
});

export default router;
