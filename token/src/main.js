import Vue from 'vue'
import './cube-ui'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import interceptor from './serve/interceptor'


Vue.config.productionTip = false


let app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

//axios请求拦截和响应拦截
interceptor(app)