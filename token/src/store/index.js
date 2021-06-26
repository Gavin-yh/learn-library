import Vue from 'vue'
import Vuex from 'vuex'
import  usLogin from '../serve/index'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: true
  },
  mutations: {
    setLoginState(state, param) {
      state.isLogin = param
    }
  },
  actions: {
    login({commit}, user) {
      //登入请求
      return usLogin(user).then(res => {
        const { code, token } = res.data
        if (code) {
          commit("setLoginState", true)
          localStorage.setItem("token", token)
        }
        return code
      })
    },
    loginOut({commit}) {
      commit("setLoginState", false)
      localStorage.removeItem("token")
    }
  },
  modules: {
  }
})
