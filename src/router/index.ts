import { createRouter, createWebHistory } from 'vue-router'
import GeneratorView from '@/views/GeneratorView.vue'
import FormatsView from '@/views/FormatsView.vue'
import FormatDetailView from '@/views/FormatDetailView.vue'
import AboutView from '@/views/AboutView.vue'

const routes = [
  {
    path: '/',
    redirect: '/generator'
  },
  {
    path: '/generator',
    name: 'generator',
    component: GeneratorView
  },
  {
    path: '/formats',
    name: 'formats',
    component: FormatsView
  },
  {
    path: '/formats/:slug',
    name: 'format-detail',
    component: FormatDetailView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/generator'
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

