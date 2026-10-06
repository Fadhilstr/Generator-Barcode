import { createRouter, createWebHistory } from 'vue-router'
import GeneratorView from '@/views/GeneratorView.vue'

const routes = [
  {
    path: '/',
    name: 'generator',
    component: GeneratorView
  },
  {
    path: '/generator',
    redirect: '/'
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
