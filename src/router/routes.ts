import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: '/partida',
        component: () => import('pages/GamePage.vue'),
      },
      {
        path: '/escolher-nivel',
        component: () => import('pages/ChooseLevelPage.vue'),
      },
      {
        path: '/todas-as-cartas',
        component: () => import('src/pages/ManyCards.vue'),
      },
      {
        path: '/todos-os-usuarios',
        component: () => import('src/pages/ManyUsers.vue'),
      },
      {
        path: '/configurar-niveis',
        component: () => import('src/pages/ConfigureLevels.vue'),
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
