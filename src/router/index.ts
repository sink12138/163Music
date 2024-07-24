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
      path: '/favor',
      name: 'favor',
      component: () => import('@/views/favor/index.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/search/index.vue')
    },
    {
      path: '/song',
      name: 'song',
      component: () => import('@/views/detail/song.vue')
    },
    {
      path: '/album',
      name: 'album',
      component: () => import('@/views/detail/album.vue')
    },
    {
      path: '/artist',
      name: 'artist',
      component: () => import('@/views/detail/artist.vue')
    },
    {
      path: '/playlist',
      name: 'playlist',
      component: () => import('@/views/detail/playlist.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/detail/user.vue')
    }
  ]
})

export default router
