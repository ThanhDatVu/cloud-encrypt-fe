import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/pages/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/destination/:id/:slug',
    name: 'destination-page',
    component: () => import('@/pages/Destination.vue'),
  },
  {
    path: '/foo',
    name: 'foo',
    component: () => import('@/pages/Foo.vue'),
  },
  {
    path: '/bar',
    name: 'bar',
    component: () => import('@/pages/Bar.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'my-link-active',
})

export default router
