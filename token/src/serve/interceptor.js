import axios from 'axios'

export default function(vm) {
    //请求拦截
    axios.interceptors.request.use(config => {
        const token = localStorage.getItem('token')
        //若token存在，就带上token
        if (token) {
            //不规范的写法 //配合模拟的后端： devServe:{ before(app){}}
            // config.headers.token = token

            //根据Bearer Token规范 配合koaServer真正的后端
            config.headers.Authorization = "Bearer " + token

        }
        return config
    })

    //响应拦截
    axios.interceptors.response.use(null, err => {
        if (err.response.status === 401) {
            //派发action   去清空缓存和重置登入状态
            vm.$store.dispatch('loginOut')
            //跳转到登入页
            vm.$router.push('/login')
        }
        //触发reject，在login.vue中捕获catch
        return Promise.reject(err)
    })
}