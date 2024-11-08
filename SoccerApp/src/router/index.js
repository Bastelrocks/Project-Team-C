import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TeamView from '@/views/TeamView.vue'
import TransferList from '@/views/TransferList.vue'
import Register from '@/views/Register.vue'
import PlayerView from '@/views/PlayerView.vue'
import ContactView from '@/views/ContactView.vue'
import NotFound from '../components/NotFound.vue'; // استيراد المكوّن NotFound

import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
    },
    {
      path: '/teams',
      name: 'teams',
      component: TeamView
    },
    {
      path: '/players',
      name: 'players',
      component: PlayerView
    },
    {
      path: '/transfers',
      name: 'transfers',
      component: TransferList
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/players',
      name: 'player',
      component: PlayerView
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    }
  ]
});

export default router;