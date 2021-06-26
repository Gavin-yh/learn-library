import vue from 'vue'
import vuex from 'vuex'
import city from './state'
import changeState from './mutations'

vue.use(vuex)


export default new vuex.Store({
    state: city,
    mutations: changeState
})