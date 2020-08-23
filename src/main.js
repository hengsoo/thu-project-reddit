import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/css/tailwind.css'
import VueCookie from 'vue-cookie'

Vue.config.productionTip = false

Vue.use(VueCookie);

new Vue({
  router,
  render: createElement => createElement(App)
}).$mount('#app')
