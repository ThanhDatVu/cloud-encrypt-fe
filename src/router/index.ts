// Composables
import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import EncryptedFiles from '@/views/EncryptedFiles.vue'
import Decrypt from '@/views/Decrypt.vue'
import Encrypt from '@/views/Encrypt.vue'
import Default from '@/layouts/default/Default.vue'

const routes = [
  {
    path: '/',
    component: Default,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
      },
    ],
  },
  {
    path: '/encrypted-files',
    name: 'encrypted-files',
    component: Default,
    children: [
      {
        path: '',
        name: 'EncryptedFiles',
        component: EncryptedFiles,
      },
    ],
  },
  {
    path: '/decrypt/:id',
    name: 'decrypt',
    component: Default,

    children: [
      {
        path: '',
        name: 'Decrypt',
        component: Decrypt,
      },
    ],

  },
  {
    path: '/encrypt',
    name: 'encrypt',
    component: Default,

    children: [
      {
        path: '',
        name: 'Encrypt',
        component: Encrypt,
      },
    ],

  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
