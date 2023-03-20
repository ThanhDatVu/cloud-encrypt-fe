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
    path: '/foo',
    name: 'foo',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Foo',
        component: () => import(/* webpackChunkName: "Foo" */ '@/views/Foo.vue'),
      },
    ],
  },
  {
    path: '/bar',
    name: 'bar',
    component: () => import('@/layouts/default/Default.vue'),

    children: [
      {
        path: '',
        name: 'Bar',
        component: () => import(/* webpackChunkName: "Bar" */ '@/views/Bar.vue'),
      },
    ],

  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
