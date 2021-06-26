import Vue from 'vue'
import App from './App.vue'
import fastclick from 'fastclick'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import router from '../router/router.js'
import store from '../state/index.js'
import '../src/assets/styles/reset.css'
import './assets/styles/border.css'
import './assets/styles/iconfont.css'
import 'swiper/dist/css/swiper.css'
import lazyLoad from 'vue-lazyload'
// import '../mock/mock'

import Mint from 'mint-ui'

import 'mint-ui/lib/style.css'

Vue.use(Mint);

fastclick.attach(document.body)
Vue.use(VueAwesomeSwiper)
Vue.use(lazyLoad,{
    loading: '../public/photo/loading2.png'
})


Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')