import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/element-variables.scss'

import './assets/css/index.scss' 
import "./assets/css/variable.scss"


Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.prototype.TITLE = process.env.VUE_APP_TITLE     //引入全局环境标题
Vue.prototype.urlApi = process.env.VUE_APP_URL_BASE_API

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')