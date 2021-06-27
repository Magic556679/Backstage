import { createRouter, createWebHashHistory } from 'vue-router'
// import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/Index.vue')
      },
      {
        path: '/Products',
        name: 'Products',
        component: () => import('../views/Products.vue')
      },
      {
        path: '/Cart',
        name: 'Cart',
        component: () => import('../views/Cart.vue')
      }
    ]
  },
  {
    path: '/Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/Dashboard',
    component: () => import('../views/Dashboards/Dashboard.vue')
  }
]
// 路由設定
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
