import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      isAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/details/:id',
    name: 'Details',
    component: () => import(/* webpackChunkName:"details" */ '@/views/Details'),
    props: true,
    meta: {
      isAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.isAuth) {
    if (!store.state.token) {
      return next({ name: 'Login' })
    }
  }
  next()
})

export default router
