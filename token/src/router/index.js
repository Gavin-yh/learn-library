import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/login.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      auto: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
//全局路由守卫
router.beforeEach((to, from, next) => {
  //即将进入的路由模块，需要权限
  if (to.meta.auto) {
    const token = localStorage.getItem('token')
    if (token) {
      next()
    }else{
      //跳转到登入页面
      next({
        path: '/login',
        query: {redirect: to.path}
      })
    }
  }else {
    //不需要登入验证的路由
    next()
  }
})

export default router
