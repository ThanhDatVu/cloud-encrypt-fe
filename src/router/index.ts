// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
    ],
  },
  {
    path: '/encrypted-files',
    name: 'encrypted-files',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'EncryptedFiles',
        component: () => import(/* webpackChunkName: "EncryptedFiles" */ '@/views/EncryptedFiles.vue'),
      },
    ],
  },
  {
    path: '/decrypt/:id',
    name: 'decrypt',
    component: () => import('@/layouts/default/Default.vue'),

    children: [
      {
        path: '',
        name: 'Decrypt',
        component: () => import(/* webpackChunkName: "Decrypt" */ '@/views/Decrypt.vue'),
      },
    ],

  },
  {
    path: '/encrypt',
    name: 'encrypt',
    component: () => import('@/layouts/default/Default.vue'),

    children: [
      {
        path: '',
        name: 'Encrypt',
        component: () => import(/* webpackChunkName: "Encrypt" */ '@/views/Encrypt.vue'),
      },
    ],

  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
