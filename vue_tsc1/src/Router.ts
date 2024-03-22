import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(''),
  routes: [
    {
      path: '/',
      component: () => import('./components/Home.vue')
    },
    {
      path: '/hello',
      component: () => import('./components/HelloWorld.vue')
    },
    {
      path: '/test',
      component: () => import('./components/Test.vue')
    }
  ]
});

export default router;
