import router from 'vue-router'
import vue from 'vue'

vue.use(router)

import hotAllBar from '@/page/AllBar/hotAllBar.vue'
import homepage from '@/page/home/home.vue'
import pageDetail from '@/page/pageDetail/detail.vue'
import selfPage from '@/page/selfpage/selfpage.vue'
import login from '@/page/selfpage/component/login.vue'
import orderBar from '@/page/selfpage/component/orderBar.vue'
import register from '@/page/selfpage/component/register.vue'
import completeOrder from '@/page/selfpage/completeOrder/completeOrder.vue'

import city from '@/page/city/city.vue'
export default new router({
    // mode :"history",
    routes:[{
        path: '/',
        name: 'home',//具名路由
        component: homepage
    },{
        path: '/banner',
        component: hotAllBar
    },{
        path: '/city',
        name: 'city',
        component: city

    },{
        path: '/detail/:id',
        name: "detail",
        component: pageDetail
    },{
        path: '/selfpage',
        name: 'selfpage',
        component: selfPage
    },{
        path: '/login',
        name: 'login',
        component: login
    },{
        path: '/order',
        name: 'order',
        component: orderBar
    },{
        path: '/completeOrder',
        name: 'completeOrder',
        component: completeOrder
    },{
        path: '/register',
        name: 'register',
        component: register
    },{
        path: '*',
        component: homepage
    }]
})