import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueCookie from 'vue-cookie'
import Axios from 'axios'

Vue.prototype.$http = Axios;

Vue.config.productionTip = false

Vue.use(VueCookie);

new Vue({
  router,
  render: createElement => createElement(App)
}).$mount('#app')
