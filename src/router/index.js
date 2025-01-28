import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue';
import OurVision from '@/views/OurVision.vue';
import ServicesView from '@/views/ServicesView.vue';
import ApplyView from '@/views/ApplyView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    { path: '/ourvision', component: OurVision },
    { path: '/services', component: ServicesView },
    { path: '/apply', component: ApplyView },
  ],
})

export default router
