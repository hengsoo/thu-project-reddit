import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userData: {},
    isAuth: false
  },
  mutations: {
    setUserData (state, userData) {
      state.userData = userData
    },
    setIsAuth (state, isAuth) {
      state.isAuth = isAuth
    }
  }
})

export default store
