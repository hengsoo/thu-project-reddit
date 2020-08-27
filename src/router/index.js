import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCookie from 'vue-cookie'
import Home from '@/views/Home'
import PostDetails from '@/views/PostDetails'
import UserDetails from '@/views/UserDetails'
import Login from '@/views/Login'
import Profile from '@/views/Profile'

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
    component: Login
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
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
      console.log(to.query)
      next({
        path: '/login',
        query: { nextUrl: to.fullPath, queryParams: to.query }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
