import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home/index.vue')
    },
    {
      path: '/explore',
      name: 'explore',
      component: () => import('@/views/explore/index.vue')
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: () => import('@/views/leaderboard/index.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/user/index.vue')
    },
    {
      path: '/song',
      name: 'song',
      component: () => import('@/views/detail/song.vue')
    }
  ]
})

export default router
