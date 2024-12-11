import { createRouter, createWebHistory } from 'vue-router';

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/stats/me',
      name: 'my-stats',
      component: () => import('../views/StatsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/stats/:userId',
      name: 'user-stats',
      component: () => import('../views/StatsView.vue'),
    },
  ],
});
