import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

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
      return axios.post('/auth/login',{ username, password })
        .then(res => {
          console.log(res)
          if(res.data.status === 0){
            commit('setUser',{ user: res.data.userInfo })
            commit('setLogin',{ isLogin: true })
          }else{
            commit('setLogin',{ isLogin: false })
          }
        })
    },

    async register({ commit }, { username, password,avatar }) {
      let res = await axios.post('/auth/register',{ username,password,avatar})
      // if(res.data.status === 0){
      //   commit('setUser',{ user: res.data.userInfo })
      //   commit('setLogin',{ isLogin: true })
      // }else{
      //   commit('setLogin',{ isLogin: false })
      // }
      return res.data
    },
  
    async logout({ commit }) {
      await axios.post('/auth/logout')
      commit('setUser', { user: null })
      commit('setLogin', { isLogin: false })
    },
  
    async checkLogin({ commit, state}) {
      // if(state.isLogin) return true
      let res = await axios.post('/auth/checkLogin')
      // console.log(res)
      if(res.data.status === 0 ){
        commit('setLogin', { isLogin: res.data.isLogin })
        commit('setUser', { user: res.data.userInfo })
      }else{
        commit('setLogin', { isLogin: false })
        commit('setUser', { user: null })
      }
    }
  



  }
})

export default store