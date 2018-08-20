import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user:null,
    isLogin:false
  },
  getters: {
    user: state => state.user,
    isLogin: state => state.isLogin
  },
  mutations: {
    setUser(state, payload){
      state.user = payload.user
    },

    setLogin(state, payload) {
      state.isLogin = payload.isLogin
    }
  },
  actions: {
    login({commit},{ username,password }) {
      return this.$axios({ username , password })
        .then(res => {
          commit('setUser',{ user: res.data })
          commit('setLogin',{ isLogin: true })
        })
    },



  }
})

export default store