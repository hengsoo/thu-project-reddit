import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCookie from 'vue-cookie'
import Home from '@/views/Home'
import PostDetails from '@/views/PostDetails'
import UserDetails from '@/views/UserDetails'

Vue.use(VueCookie)
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/post/:id',
    name: 'Post',
    component: PostDetails
  },
  {
    path: '/user/:id',
    name: 'User',
    component: UserDetails
  }
]

const router = new VueRouter({
  routes,
  linkExactActiveClass: 'bg-white rounded p-1 font-semibold text-teal-400 hover:text-teal-300'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const jwt = Vue.cookie.get('user-token')
    if (jwt == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
