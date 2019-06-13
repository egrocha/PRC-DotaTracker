import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('./views/Index.vue')
    },
    {
      path: '/match/:match_id',
      name: 'match',
      component: () => import('./views/Match.vue')
    },
    {
      path: '/heroes',
      name: 'heroes',
      component: () => import('./views/Heroes.vue')
    },
    {
      path: '/heroes/:name',
      name: 'hero',
      component: () => import('./views/Hero.vue')
    },
    {
      path: '/items',
      name: 'items',
      component: () => import('./views/Items.vue')
    },
    {
      path: '/items/:name',
      name: 'item',
      component: () => import('./views/Item.vue')
    },
  ]
})
