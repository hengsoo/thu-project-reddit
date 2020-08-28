import Vue from 'vue'
import App from './App.vue'
import store from '@/helpers/Store'
import router from './router'
import Axios from 'axios'
import VueSweetalert2 from 'vue-sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.prototype.$http = Axios

Vue.use(VueSweetalert2, { heightAuto: false })

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store: store,
  render: createElement => createElement(App),
}).$mount('#app')
