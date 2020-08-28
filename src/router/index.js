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
  },
  { path: '*', redirect: { name: 'Home' }}
]

const router = new VueRouter({
  routes,
  linkExactActiveClass: 'bg-white rounded p-1 font-semibold text-teal-400 hover:text-teal-300'
})

router.beforeEach((to, from, next) => {
  // If path requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const jwt = Vue.cookie.get('user-token')
    // If token is null redirect to login page
    if (jwt == null) {
      next({
        path: '/login',
        query: { nextUrl: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
