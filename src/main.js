import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/css/tailwind.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: createElement => createElement(App)
}).$mount('#app')
